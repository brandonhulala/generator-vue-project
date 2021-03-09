/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-02-18 15:45:15
 * @Description: 配置模块别名，但不适用于ts
 */
const { resolve } = require('./utils');

module.exports = {
    'vue$': 'vue/dist/vue.esm.js',
    'bankConfig': resolve('bankConfig'),
    'bisConfig': resolve('bankConfig/bisConfig'),
    'routeConfig': resolve('bankConfig/routeConfig'),
    'customSrc': resolve('customSrc'),
    'src': resolve('src'),
    '@': resolve('src'),
    'assets': resolve('src/assets'),
    'style': resolve('src/assets/style'),
    'external': resolve('src/external'),
    'lib': resolve('src/lib'),
    'components': resolve('src/components'),
    'model': resolve('src/model'),
    'service': resolve('src/service')
}
