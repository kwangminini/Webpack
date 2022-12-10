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
    plugins: [new HtmlWebpackPlugin()],
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
 
