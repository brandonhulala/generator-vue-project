/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-03-30 11:15:56
 * @Description: 本地开发的webpack配置文件
 */
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const { host, port, open, openPage, proxy } = require('../config').dev;
const pages = require('./pages');

const pageList = Object.keys(pages).map(e => `http://${host}:${port}/${e}.html`);
const defaultPage = `http://${host}:${port}/${openPage}`;

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',

    // 内置服务器
    devServer: {
        host: '0.0.0.0', // IP，即可以使用localhost，又可以使用本地IP
        port, // 端口
        open: false, // 不使用默认的浏览器打开插件
        proxy, // 配置反向代理
        hot: true, // 启动热更新功能
        overlay: true, // 编译出错就会弹出一个遮罩层
        stats: 'errors-only', // 只在命令行显示错误信息
        // quiet: true // 关闭命令行的所有提示信息
        clientLogLevel: 'error', // 只在浏览器的控制台显示错误信息   
        disableHostCheck: true  // 解决IE浏览器下报错不合法的域     
    },

    plugins: [
        // 使用第三方的浏览器打开插件，保证在编译完了之后再打开
        open && new OpenBrowserPlugin({ url: defaultPage }),

        // 使用第三方的信息提示插件
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`页面列表：${JSON.stringify(pageList)}`],
                notes: [`默认打开：${defaultPage}`]
            }
        })
    ].filter(p => p)
});

