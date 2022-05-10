const path = require('path');
// cssがindex.htmlに埋め込まれないようなplugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// distのindex.htmlを編集しないで済むようなplugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// distの中身を最初にきれいにするplugin(不要なファイルを削除する)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/javascript/main.js',
  output: {
    // path.resolve 絶対パス取得
    // __dirname 現在のディレクトリ
    path: path.resolve(__dirname, './dist'),
    filename: './javascript/main.js', // defaultでmain.js
  },
  module: {
    rules: [
      //ES6のトランスパイル
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          // loaderは下から上に読み込まれる
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheet/main.css',
    }),
    // index.htmlにコンテンツを追加する方法
    new HtmlWebpackPlugin({
      template: './src/template/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/template/access.pug',
      filename: 'access.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/template/members/taro.pug',
      filename: 'members/taro.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
