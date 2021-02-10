/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-20 14:40:26
 * @Description: babel配置文件
 */
module.exports = {
    "presets": [
        [
            "@babel/preset-env", { // 取代了preset-es20**系列的babel预设
                "modules": false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
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
        ],
        [ // 按需加载项目内的业务模块
            "babel-plugin-transform-imports", {
                "pageConfig": {
                    "transform": "../../bankConfig/pageConfig.js",
                    "preventFullImport": true
                }
            }
        ]
    ]
}