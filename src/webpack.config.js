var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.svg'],
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
        query: {
          presets: [ 'es2015', 'react', 'react-hmre' ]
        }
    },
    {
      test: /\.svg$/,
      loader: 'file',
    }
    ]
  },
  plugins: [
  ],
};
