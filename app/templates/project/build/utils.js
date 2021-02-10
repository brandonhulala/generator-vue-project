/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-19 10:56:21
 * @Description: 封装公共方法
 */
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

// 解析路径，基于项目的根目录
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// 解析静态资源路径，基于项目的静态资源目录
function assetsPath(dirPath) {
    const assetsDir = config.webpack.isProd
        ? config.build.assetsDir
        : config.dev.assetsDir

    return path.posix.join(assetsDir, dirPath)
}

// 获取多级的入口chunk
function getMultiEntry(globPath) {
    let entries = {}, basename, tmp, pathname

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry))
        tmp = entry.split('/').splice(-4)

        let pathsrc = tmp[0] + '/' + tmp[1]
        if (tmp[0] == 'src') pathsrc = tmp[1]

        pathname = pathsrc + '/' + basename
        entries[pathname] = entry
    })

    return entries
}

function cssLoaders(options = {}) {
    function generateLoaders(loader, loaderOptions) {
        // 默认是vue-style-loader和css-loader
        const rules = ['vue-style-loader', {
            loader: 'css-loader',
            options: {
                sourceMap: options.sourceMap
            }
        }]

        // 添加postcss-loader
        if (options.usePostCSS) {
            rules.push({
                loader: 'postcss-loader',
                options: {
                    sourceMap: options.sourceMap
                }
            })
        }

        // 添加其他loader
        if (loader) {
            rules.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // 注册全局的sass和less变量
        // if(/sass|less/.test(loader)){
        //     rules.push({
        //         loader: 'sass-resources-loader',
        //         options: {
        //             resources: [
        //                 resolve('src/style/variables.less'),
        //                 resolve('src/style/mixins/mixins.less')
        //             ]
        //         }
        //     })
        // }

        // 从js文件中提取样式
        if (options.extract) {
            rules.splice(0, 1, {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: config.build.extractPublicPath
                }
            })
        }

        return rules
    }

    // 不同的样式文件返回不同的loader
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass')
    }
}

// 设置vue的样式加载器
function styleLoaders(options) {
    const output = []
    const loaders = cssLoaders(options)

    for (const extension in loaders) {
        if (Object.hasOwnProperty.call(loaders, extension)) {
            const loader = loaders[extension]

            // 给指定的文件配置指定的loader
            output.push({
                test: new RegExp(`\\.${extension}$`),
                use: loader
            })
        }
    }
    // console.log(output)
    return output
}

module.exports = {
    resolve,
    assetsPath,
    getMultiEntry,
    styleLoaders
}