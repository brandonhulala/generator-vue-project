/*
 * @Author: huxudong
 * @Date: 2021-01-14 14:17:06
 * @LastEditTime: 2021-01-21 14:55:22
 * @Description: 入口文件
 */
import Vue from 'vue';
import router from './router';
import { createStore } from './store';
import { Demo } from 'pageConfig';

// 注册全局过滤器
import { transferUpLoadUrl } from 'lib/extend';
Vue.filter('transferUpLoadUrl', transferUpLoadUrl);

// 按需引入element-ui中的组件
import 'element-ui/lib/theme-chalk/index.css';
import { Button, MessageBox } from 'element-ui';
Vue.use(Button);
Vue.prototype.$confirm = MessageBox.confirm;

// 添加window的全局变量
window.WEBPACK_RUN_TIME = process.WEBPACK_RUN_TIME;
window.app = new Vue({
    router,
    store: createStore(),
    render: h => h(Demo)
}).$mount('#app');