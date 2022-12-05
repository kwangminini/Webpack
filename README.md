# Webpack5
Study Webpack

# Loader 
## [css-loader](https://webpack.js.org/loaders/css-loader/)
#### css 파일을 번들링해주는 loader

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
