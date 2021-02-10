/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-21 14:43:59
 * @Description: 将不参与打包的静态资源，手动复制到输出目录
 */
const { resolve } = require('./utils');
const assetsRoot = require('../config').build.assetsRoot;

module.exports = [
    {
        from: resolve('src/external'),
        to: `${assetsRoot}/external`
    }
];