/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-19 10:56:52
 * @Description: 基础的webpack配置文件
 */
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const utils = require('./utils');
const alias = require('./alias');
const copies = require('./copies');
const pages = require('./pages');
const globals = require('./globals');

// 获取多入口和多页打包的配置，
const entries = {},
    htmlWebpackPlugins = [];
for (const chunkName in pages) {
    // 与html文件同级且同名的js文件，就是该页面的入口文件
    entries[chunkName] = pages[chunkName].replace(/\.html$/, '.js');

    // 在加载入口文件之前，引入IE兼容包
    entries[chunkName] = ['core-js/stable', 'regenerator-runtime/runtime', entries[chunkName]]

    // 导出包含完整资源的html文件
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template: pages[chunkName], // 模板路径
        filename: chunkName + '.html', // html文件名
        chunks: [chunkName, 'vendor', 'common', 'manifest'], // 给页面添加入口chunk和公共chunk
        // hash: true, // 在打包出来的js文件名后面添加hash值
        // minify: { // 压缩html文件
        //     collapseWhitespace: true, // 去除空格
        //     removecomments: true // 去除注释
        // }
    }));
}

module.exports = {
    entry: entries, // 入口

    output: {
        path: config.build.assetsRoot, // 导出目录
        filename: utils.assetsPath('js/[name].[hash].js'), // 入口文件名
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'), // 非入口文件名
        publicPath: config.webpack.isProd // 文件名的前置路径
            ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },

    resolve: {
        extensions: ['.js', '.vue', '.json', '.jsx', '.ts', '.tsx'], // 可省略的后缀名
        alias // 模块别名
    },

    module: {
        rules: [
            // 加载css
            {
                test: /\.css$/,
                use: [
                    // 在开发环境下加载为内部样式，在生产环境下提取成单独的css文件
                    config.webpack.isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: config.build.extractPublicPath
                        }
                    },
                    'css-loader', 'postcss-loader' // 处理顺序为从右向左
                ],
            },
            // 加载sass
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    config.webpack.isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: config.build.extractPublicPath
                        }
                    },
                    'css-loader', 'postcss-loader', 'sass-loader'
                ],
            },
            // 加载less
            {
                test: /\.less$/,
                use: [
                    config.webpack.isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: config.build.extractPublicPath
                        }
                    },
                    'css-loader', 'postcss-loader', 'less-loader'
                ],
            },
            // 加载vue
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: utils.styleLoaders({
                            sourceMap: config.webpack.isProd, // 生产环境启用源码映射
                            extract: config.webpack.isProd, // 生产环境下提取css
                            usePostCSS: config.webpack.isProd // 生产环境下使用postcss
                        })
                    }
                }
            },
            // 开启代码检查
            {
                test: /\.(js|vue|ts|tsx)$/,
                include: [utils.resolve('src')],
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    },
                },
                enforce: 'pre'
            },
            // 加载js和jsx
            {
                test: /\.(js|jsx)$/,
                exclude: (file) => /node_modules/.test(file) && !/sinosun-operation-ui/.test(file),
                use: 'babel-loader'
            },
            // 加载ts和tsx
            {
                test: /\.tsx?$/,
                exclude: (file) => /node_modules/.test(file) && !/sinosun-operation-ui/.test(file),
                use: [
                    {
                        loader: 'ts-loader',
                        options: { allowTsInNodeModules: true }
                    }
                ],
            },
            // 加载图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000, // 对于小于1000kb的图片，转换成内联的base64编码，否则就打包出来
                        esModule: false, // 启用通过require方法引入的静态资源
                        name: utils.assetsPath('img/[name].[ext]') // 在输出目录中的位置和名称
                    }
                }
            },
            // 加载字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[ext]')
                    }
                }
            }
        ]
    },

    // 插件，从后往前执行
    plugins: [
        new CopyWebpackPlugin({ // 复制文件到指定的位置
            patterns: copies
        }),

        config.webpack.isProd && new MiniCssExtractPlugin({ // 将css从js中提取出来
            filename: utils.assetsPath('css/[name].[contenthash:8].css'),
            chunkFilename: utils.assetsPath('css/pages/[name].[contenthash:8].css'),
            ignoreOrder: true // 忽略文件的加载顺序
        }),

        ...htmlWebpackPlugins, // 配置多页面

        new VueLoaderPlugin(), // 配合vue-loader

        new webpack.DefinePlugin(globals), // 定义编译过程中的全局变量
    ].filter(p => p)
}