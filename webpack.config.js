const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const crypto = require('crypto');
const fs = require('fs');

// Custom plugin to calculate and inject CSP hash for inline script
class CSPHashPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('CSPHashPlugin', () => {
      try {
        // Read the built index.html
        const indexPath = path.resolve(__dirname, 'dist/index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');

        // Extract inline script content between <script> and </script> tags
        const scriptMatch = indexContent.match(/<script>\s*([\s\S]*?)\s*<\/script>/);
        if (!scriptMatch || !scriptMatch[1]) {
          console.warn('CSPHashPlugin: Could not find inline script in index.html');
          return;
        }

        const scriptContent = scriptMatch[1];

        // Calculate SHA256 hash of the script content
        const hash = crypto.createHash('sha256').update(scriptContent).digest('base64');
        const cspHash = `sha256-${hash}`;

        // Read manifest.json
        const manifestPath = path.resolve(__dirname, 'dist/manifest.json');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

        // Update CSP with the calculated hash
        manifest.content_security_policy = {
          extension_pages: `script-src 'self' '${cspHash}'; object-src 'self'`
        };

        // Write updated manifest.json
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

        console.log(`CSPHashPlugin: Generated CSP hash: ${cspHash}`);
      } catch (err) {
        console.error('CSPHashPlugin error:', err);
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
    new CSPHashPlugin(),
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
