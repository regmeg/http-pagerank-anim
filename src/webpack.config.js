var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.svg', '.png', ',jpg'],
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader'
    //   },
    // ],
    loaders: [
      {
        test: require.resolve("react"),
        loader: "expose?React"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
        query: {
          presets: [ 'es2015', 'react', 'react-hmre' ]
        }
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'file',
      }
    ]
  },
  // eslint: {
  //   configFile: './.eslintrc'
  // },
  plugins: [
  ],
};
