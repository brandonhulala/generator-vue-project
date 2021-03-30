/*
 * @Author: huxudong
 * @Date: 2020-12-30 11:29:40
 * @LastEditTime: 2021-03-30 11:19:42
 * @Description: webpack的可配置选项，部分参数来自package.json文件
 */
const package = require('../package.json');
const path = require('path');
const internalIp = require('internal-ip');
const ipv4 = internalIp.v4.sync();
const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
    webpack: {
        runTime: new Date().toLocaleString(), // 每次运行webpack的日期时间
        env, // 当前的环境变量
        isDev: env === 'development', // 当前环境是否为开发
        isProd: env === 'production', // 当前环境是否为生产
        moduleName: 'pages' // 多页面入口，此目录下的每个子目录对应一个页面
    },
    dev: {
        host: ipv4 || 'localhost', // 域名
        port: package.port, // 端口号
        open: true, // 是否打开浏览器
        openPage: `pages/${package.page}`, // 指定浏览器打开的页面
        proxy: { // 反向代理
            '/bizmate': {
                'target': 'https://bizmatedev.sinosun.com:17280/', // dev
                // 'target': 'https://bizmatesit.sinosun.com:17380/',  // sit
                'changeOrigin': true
            },
            '/proxy': {
                'target': 'https://bizmatedev.sinosun.com:17280/', // dev
                // 'target': 'https://bizmatesit.sinosun.com:17380/',  // sit
                'changeOrigin': true
            }
        },
        assetsDir: 'assets', // 除html以外的静态资源目录
        assetsPublicPath: '/', // html里面引用静态资源的的相对地址
    },
    build: {
        assetsRoot: path.resolve(__dirname, `../dist/${package.name}`), // 打包文件所在目录
        assetsDir: 'assets',
        assetsPublicPath: '../',
        extractPublicPath: '../../../' // 抽离出来的css文件中引用静态资源的的相对地址
    }
}
