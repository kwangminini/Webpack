# Webpack5
Study Webpack

# Loader 
## [css-loader](https://webpack.js.org/loaders/css-loader/)
#### css 파일을 번들링해주는 loader

1. 기본 세팅 방법 (webpack.config.js)
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
