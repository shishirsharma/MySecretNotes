const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/scripts.babel/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (url) => {
                  if (url.includes('fontawesome-webfont')) return false;
                  return true;
                }
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff2?)([\?#].*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      'components': path.resolve(__dirname, 'app/scripts.babel/components'),
      'utils': path.resolve(__dirname, 'app/scripts.babel/utils.jsx')
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      vm: false
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'app/manifest.json', to: 'manifest.json' },
        { from: 'app/index.html', to: 'index.html' },
        { from: 'app/images', to: 'images' },
        { from: 'app/_locales', to: '_locales' },
        { from: 'app/scripts.babel/background.js', to: 'scripts/background.js' },
        { from: 'node_modules/font-awesome/fonts', to: 'fonts' }
      ]
    })
  ]
};
