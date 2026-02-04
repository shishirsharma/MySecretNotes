const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const crypto = require('crypto');
const fs = require('fs');

// Custom plugin to inject nonce for inline script CSP
class CSPNoncePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('CSPNoncePlugin', () => {
      try {
        // Generate a random nonce
        const nonce = crypto.randomBytes(16).toString('hex');

        // Read the built index.html
        const indexPath = path.resolve(__dirname, 'dist/index.html');
        let indexContent = fs.readFileSync(indexPath, 'utf8');

        // Add nonce attribute to inline script
        indexContent = indexContent.replace(
          /<script>/,
          `<script nonce="${nonce}">`
        );

        // Write updated index.html
        fs.writeFileSync(indexPath, indexContent, 'utf8');

        // Read manifest.json
        const manifestPath = path.resolve(__dirname, 'dist/manifest.json');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

        // Update CSP with the nonce
        manifest.content_security_policy = {
          extension_pages: `script-src 'self' 'nonce-${nonce}'; object-src 'self'`
        };

        // Write updated manifest.json
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

        console.log(`CSPNoncePlugin: Generated nonce: ${nonce}`);
        console.log(`CSPNoncePlugin: CSP directive: ${manifest.content_security_policy.extension_pages}`);
      } catch (err) {
        console.error('CSPNoncePlugin error:', err);
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
    new CSPNoncePlugin(),
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
