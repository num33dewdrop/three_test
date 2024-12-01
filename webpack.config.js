const path = require('path');
// const glob = require('glob');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV === 'production';

module.exports = {
  mode: mode? 'production' : 'development',
  entry: {
    common: path.resolve(__dirname, 'resources/ts', 'common.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'public/assets/'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          MinCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // url()を機能させる。
              url: true,
              sourceMap: true,
            }
          },
          {
            // PostCSSでcssを処理する
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // ベンダープレフィックスを自動付与する
                plugins: [require('autoprefixer')({grid: true})],
              },
            },
          },
          {
            // sassをコンパイルしてcssに変換する
            loader: 'sass-loader',
            options: {
              // Dart Sassを使えるようにする
              implementation: require('sass'),
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.7, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              }
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 解決するファイルの拡張子
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // 並列処理の実行を有効化
        // 同時に実行するを数値を設定
        parallel: 4,
        // swcを有効化
        // minify: TerserPlugin.swcMinify,
        // Minify Optionsを設定
        terserOptions: {
          // 最適化
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          // 変数名を短く
          mangle: {
            safari10: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new MinCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js', '.jsx'], // チェックするファイルの拡張子
      exclude: 'node_modules',
      failOnError: false, // エラーがあってもビルドを続行
      emitWarning: true, // 警告をコンソールに出力
      emitError: true, // エラーをコンソールに出力
      quiet: false // 全てのメッセージを表示（警告も含む）
      // fix: true, // 自動修正を有効にする場合
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/resources/img/`,
          to: `${__dirname}/public/assets/img/`
        },
        {
          from: `${__dirname}/resources/objs/`,
          to: `${__dirname}/public/assets/objs/`
        }
      ]
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true, optimizationLevel: 3 }],
            ['mozjpeg', { quality: 75 }],
            ['pngquant', { quality: [0.7, 0.9] }]
          ],
        },
      },
    })
  ],
  devtool: mode? undefined : 'source-map',
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300, // ファイルが変更されてからビルドが開始されるまでの待機時間
    poll: 1000 // ポーリング間隔（ms単位）
  }
};