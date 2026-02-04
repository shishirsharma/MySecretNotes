const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const crypto = require('crypto');
const fs = require('fs');

// Custom plugin to set default CSP for MV3
class CSPPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('CSPPlugin', () => {
      try {
        // Read manifest.json
        const manifestPath = require('path').resolve(__dirname, 'dist/manifest.json');
        const manifest = JSON.parse(require('fs').readFileSync(manifestPath, 'utf8'));

        // Set standard CSP - no inline scripts allowed
        // Default theme is set via CSS variables in index.html <style> tag
        // Theme switching is handled by React/ThemeProvider
        manifest.content_security_policy = {
          extension_pages: "script-src 'self'; object-src 'self'"
        };

        // Write updated manifest.json
        require('fs').writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

        console.log(`CSPPlugin: Set CSP for extension pages`);
        console.log(`CSPPlugin: CSP directive: ${manifest.content_security_policy.extension_pages}`);
      } catch (err) {
        console.error('CSPPlugin error:', err);
      }
    });
  }
}

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
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new CSPPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'app/manifest.json', to: 'manifest.json' },
        {
          from: 'app/index.html',
          to: 'index.html',
          transform(content) {
            // Inject timestamp cache buster into bundle.js query string
            const timestamp = Date.now();
            return content.toString().replace(
              /scripts\/bundle\.js(\?v=[^\s"]*)?/g,
              `scripts/bundle.js?v=${timestamp}`
            );
          }
        },
        { from: 'app/images', to: 'images' },
        { from: 'app/_locales', to: '_locales' },
        { from: 'app/scripts.babel/background.js', to: 'scripts/background.js' },
        { from: 'node_modules/font-awesome/fonts', to: 'fonts' }
      ]
    })
  ]
};
