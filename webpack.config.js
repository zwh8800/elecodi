const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
    const FriendlyErrors = new FriendlyErrorsPlugin();
    console.log('env=' + env);
    return {
        mode: env,
        entry: './src/app.tsx',
        // target: 'electron-renderer',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory([{
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css"
                        }, {
                            style: false,
                            libraryName: 'lodash',
                            libraryDirectory: null,
                            camel2DashComponentName: false
                        }])]
                    })
                }
            }, {
                loader: 'babel-loader',
                test: /\.js(x)?$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                prependData: `
                                    @import "~@/assets/style/mixin";
                                    @import "~@/assets/style/variable";
                                `
                            }
                        }
                    ]
                })
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.wasm', '.mjs', '.js', '.json', '.scss'],
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        plugins: [
            CSSExtract,
            FriendlyErrors
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            port: 8080,
            quiet: true,   // 禁止显示devServer的console信息
            overlay: true, // 编译出现错误时，将错误直接显示在页面上
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/',
            proxy: {
                '/api': {
                    target: 'http://10.0.0.228:8081',
                    pathRewrite: { '^/api': '' }
                }
            }
        }
    };
}
