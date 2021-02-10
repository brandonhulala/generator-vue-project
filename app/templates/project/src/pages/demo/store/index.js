/*
 * @Author: huxudong
 * @Date: 2020-12-08 17:23:55
 * @LastEditTime: 2021-01-21 14:55:48
 * @Description: 状态管理
 */
import CommonStore from 'lib/CommonStore';

let store;

export function createStore() {
    CommonStore.initState();

    CommonStore.registerModule('demo', {
        // ...
    });

    store = CommonStore;
    return CommonStore;
}

export function getStore() {
    return store;
}

export default store;