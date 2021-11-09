import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

const extensions = ['.ts', '.tsx', '.js', '.jsx'];
const publicPath = path.join(__dirname, 'public');
const buildPath = path.resolve(__dirname, 'build');
const template = path.resolve(__dirname, './public/index.html');

const serverConfig = {
    devServer: {
        https: true,
        host: 'localhost',
        port: 3000,
        static: [
            {
                directory: buildPath,
                watch: true,
                serveIndex: true
            }
        ],
        compress: true,
        hot: true,
        historyApiFallback: true,
        open: ['/'],
        devMiddleware: {
            writeToDisk: true,
            publicPath,
            index: true,
            stats: 'errors-warnings'
        },
        client: {
            overlay: {
                warnings: true,
                errors: true
            },
            logging: 'none'
        }
    }
};

const webpackConfig: Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: buildPath,
        filename: '[name].bundle.js',
        // library: 'someLibName',
        // libraryTarget: 'commonjs',
        chunkFilename: `[name].[contenthash].chunk.js`,
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    compilerOptions: {
                        noImplicitAny: false
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: './images/[name].[ext]',
                    publicPath: `./images`
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        /* Deletes our build directory when building */
        // new SourceMapDevToolPlugin({}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template
        }),
        new TerserPlugin({}),
        new CopyPlugin({
            patterns: [
                { from: './public/images', to: './images' }
                // { from: './public/data', to: './' }
            ]
        })
    ],
    resolve: {
        extensions,
        alias: {
            '@equinor/authentication': path.resolve(
                __dirname,
                './packages/authentication/'
            ),
            '@equinor/http-client': path.resolve(
                __dirname,
                './packages/httpClient/'
            ),
            '@equinor/lighthouse-core': path.resolve(
                __dirname,
                './packages/core/'
            ),
            '@equinor/lighthouse-hooks': path.resolve(
                __dirname,
                './packages/hooks/'
            ),
            '@equinor/lighthouse-components': path.resolve(
                __dirname,
                './packages/components/'
            ),
            '@equinor/lighthouse-util': path.resolve(
                __dirname,
                './packages/util/'
            ),
            '@equinor/lighthouse-typeGuard': path.resolve(
                __dirname,
                './packages/typeGuard/'
            ),
            '@equinor/lighthouse-conf': path.resolve(
                __dirname,
                './packages/configuration/'
            )
        }
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ie8: false,
                    output: {
                        comments: /^@lighthouse-client/
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    }
};

const config = {
    ...webpackConfig,
    ...serverConfig
};

export default config;
