/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-03-08 14:49:33
 * @Description: babel配置文件
 */
module.exports = {
    "presets": [
        [
            "@babel/preset-env", { // 取代了preset-es20**系列的babel预设
                "modules": "auto", // 默认为auto，如果取umd表示使用通用的模块规范，如果取false表示强制对ES6的模块文件不做任何转化
                "corejs": {
                    "version": 3, // 如果升级到3，删除babel-polyfill，安装core-js和regenerator-runtime
                    "proposals": true // 搞定一些提案级别的特性
                },
                "useBuiltIns": "entry" // 在入口文件的顶部引入core-js/stable和regenerator-runtime/runtime
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime", // 通过模块导入的引入方式，重用babel的帮助函数，防止污染全局作用域
        "@babel/plugin-syntax-dynamic-import", // 识别import()的动态导入语法
        "transform-vue-tsx", // 在vue单文件组件中使用tsx
        [ // 按需加载element-ui
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        [ // 按需加载sinosun-operation-ui
            "import",
            {
                "libraryName": "sinosun-operation-ui",
                "libraryDirectory": "components",
                "camel2DashComponentName": false
            }
        ]
    ]
}