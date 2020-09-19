const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts'
  },
  resolve: {
    extensions: ['.ts']
  },
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [{
      test: /\.mango$/,
      use: [{
        loader: 'rloader',
        options: {
          targetStr: 'suger',
          resultStr: 'rainbow'
        }
      }]
    }, {
      test: /\.(tsx|ts)$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        configFile: path.resolve(__dirname, './tsconfig.json')
  　　 }
    }, {
      test: /\.(ts|js)$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
      options: {}
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}