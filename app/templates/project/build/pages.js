/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-19 10:56:33
 * @Description: 配置多页面
 * 1.key为chunk名，value为对应的页面模板
 * 2.每个页面的入口文件和模板文件必须同级且同名
 */
const { getMultiEntry } = require('./utils');
const moduleName = require('../config').webpack.moduleName;
const pages = getMultiEntry('./src/' + moduleName + '/**/*.html');

module.exports = pages;