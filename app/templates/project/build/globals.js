/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-19 10:51:49
 * @Description: 配置全局变量
 */
const config = require('../config');

module.exports = { // 参数值必须使用JSON.stringify方法
    'process.WEBPACK_RUN_TIME': JSON.stringify(config.webpack.runTime), // 运行webpack的日期时间
    'process.ASSETS_PUBLIC_PATH': JSON.stringify(config[config.webpack.isDev ? 'dev' : 'build'].assetsPublicPath) //  静态资源的抬头路径
}