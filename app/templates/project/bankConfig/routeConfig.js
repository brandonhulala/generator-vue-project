/*
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-02-23 09:19:12
 * @Description: 控制当前项目中所有的路由引入
 * 1.路径
 * (1)主干："@"抬头的路径，对应src目录中的主干代码，由公司研发人员维护
 * (2)定制："customSrc"抬头的路径，对应customSrc目录中的定制代码，由交付定制人员维护
 * 2.定制
 * (1)首先，在当前文件中找到定制页面对应的路由路径，然后将路径抬头的@改成customSrc
 * (2)然后，在customSrc目录中的路由文件中，根据定制需求，扩展组件中的业务代码
 * (3)注意，修改路径之后，必须重新编译整个项目，否则修改不会生效
 */
const routeConfig = {};

// 例子
routeConfig['Demo'] = () => import('@/pages/demo/demo.vue'); // customSrc/pages/demo/demo.vue
routeConfig['DemoIndex'] = () => import('@/pages/demo/views/index/index.vue'); // customSrc/pages/demo/views/index/index.vue

module.exports = routeConfig;