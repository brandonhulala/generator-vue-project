/*
 * @Author: huxudong
 * @Date: 2020-12-09 18:38:06
 * @LastEditTime: 2021-02-09 16:23:41
 * @Description: 公共路由配置
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import store from './CommonStore';
import { showToast } from 'sinosun-operation-ui/lib/utils/commonUtil';

// 创建一个路由实例
const router: any = new Router({
    // 滚动行为
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
});

// 定义路由权限码
router.authCode = '';

// 设置路由拦截器
router.beforeEach((to, from, next) => {
    // 本地开发不校验权限，线上环境才会校验权限
    if (process.env.NODE_ENV == 'development') {
        next();
    } else {
        const CommonApi = top['CommonApi'];

        if (CommonApi) {
            if (CommonApi.checkUserAuth(router.authCode)) {
                next();
            } else {
                showToast('暂无访问权限');
            }
        } else {
            showToast('暂无访问权限');
        }
    }
});
router.afterEach((to) => {
    // 在子页面中，改变路由之后，给菜单地址添加路由hash
    if (window['CommonApi']) return;

    const { currentMenuURL } = store.state.systemParam;

    let newMenuURL = '', idx = currentMenuURL.indexOf('#');
    if (idx == -1) {
        newMenuURL = currentMenuURL + '#' + to.fullPath;
    } else {
        newMenuURL = currentMenuURL.substring(0, idx) + '#' + to.fullPath;
    }

    store.commit('changeSystemParam', {
        prevMenuURL: currentMenuURL,
        currentMenuURL: newMenuURL
    });
});

export default router;