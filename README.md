# Webpack5
webpack Document에서 기본적인 컨셉을 이해하고, 내가 사용하는 혹은 자주 사용되는 모듈 및 기능들 공부하고 기록


# concept
## 1. 웹팩은 모던 자바스크립트를 위한 정적 모듈 번들러이다.
웹팩이 application을 처리할 때, 웹팩은 하나 혹은 다수의 entry point로부터 의존성 그래프를 만들고, 컨텐츠를 제공하는 정적 자산인 번들들로 프로젝트에 필요한 모든 모듈을 결합시킨다.
버전 4 이후로, 프로젝트를 번들하기 위해 웹팩은 configuration file을 필요로하지 않는다.
* Core Concept
    * Entry
    * Output
    * Loaders
    * Plugins
    * Mode
    * Browser Compatibility
## 2. Entry
Entry point는 웹팩이 내부적으로 의존성 그래프를 그리기 위한 시작점 모듈로써 entry point와 직간접적으로 연결된 라이브러리와 모듈들을 찾는다.
* Default Value : ```./src/index.js```
* 커스터마이징 가능
    * webpack.config.js 
      ```
      module.exports = {
           entry: './path/to/my/entry/file.js',
         }; 
      ```
## 3. Output
Output은 웹팩이 생성한 번들 파일을 내보낼 위치와 파일의 이름 지정 방법을 나타낸다.
* main output 파일은 ```./dist/main.js``` 그 외 기타 생성된 파일은 ```./dist```폴더 안에 생성이 default값이다.
* 기본적인 예제 (output.path : 번들 파일을 내보낼 위치 설정, output.filename : 번들 파일 이름 설정
    * webpack.config.js
      ```
      const path = require('path');
      module.exports = {
          entry: './path/to/my/entry/file.js',
          output: {
              path: path.resolve(__dirname, 'dist'),
              filename: 'my-first-webpack.bundle.js',
          },
      };
      ```
## 4. Loader
웹팩은 기본적으로 javascript와 json 파일을 이해하는데, Loader는 이 외의 파일 유형들을 처리할 수 있고 애플리케이션의 의존성그래프에 추가할 수 있도록 모듈로 변환시켜준다.
* loader는 두가지 속성(test, use)을 가진다.
    * ```test``` : 변환해야하는 파일을 식별
    * ```use``` : 변환에 사용되는 loader를 의미
* webpack.config.js
```
module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```
## 5. Plugins
Loader는 특정 유형의 모듈을 변환하는데 사용되지만, Plugins는 번들 최적화, 자산 관리 및 환경 변수 주입 등 광범위한 작업을 수행한다.
Plugin을 사용하기 위해서 ```require()```를 통해 plugin을 가져와서 Plugin 배열에 추가한다. options를 통해 커스터마이징이 가능하다.
서로 다른 목적의 plugin을 여러번 사용하기 위해 new 연산자로 호출하여 인스턴스를 생성한다.
* HtmlWebpackPlugin은 애플리케이션을 위한 HTML 파일을 만들고 생성된 모든 번들을 HTML파일에 주입해주는 Plugin.
* webpack.config.js
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```
## 6. Mode
모드 매개변수를 ```development``` ```production``` ```none```  세개 중에 선택하며 선택된 환경에 맞춰 webpack의 내장 최적화를 활성화한다.
default:```production```
* webpack.config.js
```
module.exports = {
  mode: 'production',
};
```
## 7. Browser Compatibility
웹팩은 ES5와 호환되는 모든 부라우저를 지원한다 (IE8이하에서는 지원x)
이전의 브라우저를 호환하려면 polyfill을 load해야 한다.

## 8. Environment
웹팩 5는 Node.js version 10.13.0+ 에서 지원

# Entry Points
## 1) Single Entry Syntax
Single Entry Syntax는 하나의 진입점이 있는 응용 프로그램이나 빠르게 웹팩 설정할 때 용의하지만, 확장성이 유연하지 않다.
### multi-main entry
multi-main entry는 여러 종속 파일을 함께 주입하고 해당 종속성을 하나의 chunk로 의존성을 생성할 수 있다.
#### webpack.config.js
```
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```
## 2) Object Syntax
object syntax는 더 장황하지만 확장성이 유용하다
#### webpack.config.js
```
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
```
#### EntryDescription object
* ```dependOn``` : 현재 진입점이 의존하는 진입점. entry point가 load되기 전에 load되어야 한다.
* ```filename``` : disk에 있는 각 output file의 이름을 명시한다.
* ```import``` : 시작 시 load되는 모듈.
* ```library``` : 현재 entry에서 library를 bundle하는 library의 옵션을 명시한다.
* ```runtime``` : runtime chunk의 이름으로 설정될 때 새 runtime chunk가 생성, webpack 5.43 version부터 새로운 runtime chunk를 피하기위해 false설정 가능
* ```publicPath``` : 브라우저에서 참조될 때 entry의 output file에 대한 공용 url주소를 지정한다.

```
module.exports = {
  entry: {
    a2: 'dependingfile.js',
    b2: {
      dependOn: 'a2',
      import: './src/app.js',
    },
  },
};
```
* ```dependOn```과```runtime```은 같이 설정할 수 없다. (아래의 코드는 에러 발생)
```
module.exports = {
  entry: {
    a2: './a',
    b2: {
      runtime: 'x2',
      dependOn: 'a2',
      import: './b',
    },
  },
};
```
* ```runtime```은 기존의 entry point 이름을 설정할 수 없다. (아래의 코드는 에러 발생)
```
module.exports = {
  entry: {
    a1: './a',
    b1: {
      runtime: 'a1',
      import: './b',
    },
  },
};
```
* ```dependOn```은 순환적이지 않아야 한다. (아래의 코드는 에러 발생)
```
module.exports = {
  entry: {
    a3: {
      import: './a',
      dependOn: 'b3',
    },
    b3: {
      import: './b',
      dependOn: 'a3',
    },
  },
};
```
- - -
# [Output](https://webpack.js.org/concepts/output/)
## output 구성 설정은 웹팩에 컴파일된 파일을 디스크에 쓰는 방법을 알려준다. entry point는 여러개일 수 있지만 output 구성은 하나만 설정 가능하다.
### Multiple Entry Points
구성이 하나 이상의 "chunk"를 생성하는 경우 (multiple entry points 구조이거나 CommonsChunkPlugin 같은 Plugin을 사용하는 경우) 각 파일이 고유한 이름을 갖도록 설정 가능

## clean
build시 이전에 생성된 bundle파일을 지우기 위해 webpack4에서 사용되는 CleanWebpackPlugin은 webpack5에서 clean 옵션으로 대체할 수 있다.
```
output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.[hash].js",
    clean: true,
  },
```

# Loader 
## [css-loader](https://webpack.js.org/loaders/css-loader/)
### css 파일을 번들링해주는 loader

##### 1. 기본 세팅 방법 (webpack.config.js)
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```
* style-loader와 같이 쓰이는 이유
   * style-loader가 css를 DOM에 주입시켜준다. 즉, html의 style 태그 안에 css 주입시켜준다.

##### 2. Options
* Url
    * Default : true
    * css 함수 url, image-set을 parsing해준다.
    * ex) <code> url('image.png') => require('./image.png') </code>
    * node_modules 경로의 이미지 불러올 때 prefix ~ 사용 ex) <code> url('~module/image.png') => require('module/image.png') </code> 
    * <b> Boolean Type </b>
    ```
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            loader: "css-loader",
            options: {
              url: true,
            },
          },
        ],
      },
    };
    ```
    * <b> Object Type </b>
    ```
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            loader: "css-loader",
            options: {
              url: {
                filter: (url, resourcePath) => {
                  // resourcePath - path to css file

                  // Don't handle `img.png` urls
                  if (url.includes("img.png")) {
                    return false;
                  }

                  // Don't handle images under root-relative /external_images/
                  if (/^\/external_images\//.test(path)) {
                    return false;
                  }

                  return true;
                },
              },
            },
          },
        ],
      },
    };
    ```
 
 ## babel-loader
 #### 1. 기본 세팅 방법 (webpack.config.js)
 ```
 module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
 ```
 #### 2. 주의할 점
 ``` /\.m?js$/ ``` 같은 매칭 때문에 필요없는 파일(Ex) node_modules 폴더)이 babel-loader에 의해 변환되고 있는지 주의해야 한다.
 따라서, exclude에 node_modules 등 불필요한 파일 변환 안되도록 설정한다.
 - - - 
 # Plugin
 ## [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin)
 ### webpack bundle에 필요한 HTML 파일 생성을 간소화해준다.
 ### 특히, hash값을 포함하는 파일을 webpack bundle할 때 유용하다. 
 ### 플러그인이 HTML 파일을 생성하도록 하거나, lodash 템플릿을 사용하여 자체 템플릿을 제공하거나, 자체 로더를 사용할 수 있습니다.
 
 ##### 1. 기본 세팅 방법 (webpack.config.js)
  ```
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const path = require('path');

  module.exports = {
    entry: 'index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index_bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({template : public/index.html})],
  };
  ```
 * 위와 같이 세팅한다면 <b> dist/index.html </b> 생성
 ```
   <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>webpack App</title>
    </head>
    <body>
      <script src="index_bundle.js"></script>
    </body>
  </html>
 ```
 * webpack entry point가 많아진다면 <script>태그 안에 모두 포함된채로 html 생성
 * MiniCssExtractPlugin에서 추출된 CSS와 같이 webpack의 output에 CSS파일이 있다면 <head>태그 안에 <link>태그로 삽입된다.
 
 ## MiniCssExtractPlugin
 ### CSS를 별도의 파일로 추출하고 CSS를 포함하는 JS파일마다 CSS파일을 생성한다.
 ### css-loader와 같이 사용하는걸 추천한다.
 
 ##### 1. 기본 세팅 (webpack.config.js)
 ```
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
 ```
