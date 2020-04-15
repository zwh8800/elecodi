const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
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
                        before: [tsImportPluginFactory({
                            "libraryName": "antd",
                            "libraryDirectory": 'es',
                            "style": "css"
                        })]
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
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.wasm', '.mjs', '.js', '.json'],
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
}
