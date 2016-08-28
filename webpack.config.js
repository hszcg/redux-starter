const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const path = require('path');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'src/js/'),
  build: path.join(__dirname, 'dist')
};

process.env.BABEL_ENV = TARGET;

const common = {
  resolve: {
    root: [
      path.resolve('./src/js'),
    ]
  },
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: require.resolve('jquery'),
      loader: 'expose?$!expose?jQuery'
    }, {
      test: /bootstrap3-editable\/.+\.(js)$/,
      loader: 'imports?jQuery=jquery,$=jquery,this=>window'
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy'],
        presets: ['react', 'es2015', 'stage-0', 'stage-2'],
      }
    }, {
      include: /\.json$/,
      loaders: ['json-loader']
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      favicon: './src/img/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

if (TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
//    devtool: 'source-map',
    devServer: {
      contentBase: PATHS.build,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new CleanPlugin([PATHS.build]),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
