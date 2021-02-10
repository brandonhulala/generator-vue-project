/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-02-07 17:25:17
 * @Description: 生产环境的webpack配置文件
 */
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const chalk = require('chalk');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: 'production',
    // devtool: 'source-map',
    devtool: 'cheap-module-source-map',

    stats: {
        children: false
    },
    performance: {
        hints: false // 隐藏资源体积过大的警告信息
    },

    plugins: [
        // 打开打包结果分析工具
        process.env.npm_config_report && new BundleAnalyzerPlugin(),

        // 每次打包之前，先清空输出目录里的旧文件
        new CleanWebpackPlugin()
    ].filter(p => p),

    // 设置生产环境的优化配置
    optimization: {
        // 压缩文件
        minimizer: [
            new TerserPlugin({
                exclude: /\.min\.js$/, // 排除已被压缩的js文件
                parallel: true, // 启用多线程并行运行，提高编译速度
                extractComments: false, // 是否将注释提取到单独的文件中
                // sourceMap: true, // 配合source-maps
                terserOptions: {
                    compress: { // 删除console.log
                        // drop_console: true,
                    }
                }
            }),
            new OptimizeCssPlugin() // 压缩css
        ],

        // 代码分割
        splitChunks: {
            chunks: 'all', // 三选一： "async"|"initial"|"all"
            minSize: 30000, // 代码大于多少kb才会生成一个新包
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // 从哪里提取代码
                    name: 'vendor', // 抽离出来的chunk的名称
                    minChunks: 1, // 被多少个chunk引用之后就提取出来
                    priority: 10 // 缓存组的优先级
                },
                common: {
                    test: /[\\/]src[\\/]/,
                    name: 'common',
                    minChunks: 2
                }
            }
        },

        /*
            提取webpack运行时的代码，避免每次修改业务代码导致vendor发生改变
            但会让打包出来的filename全部被chunkFilename替代
        */
        // runtimeChunk: {
        //     name: 'manifest'
        // }
    }
});

console.info(chalk.cyan('> 正在构建...'));