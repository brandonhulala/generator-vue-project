/*
 * @Author: huxudong
 * @Date: 2020-12-08 17:23:55
 * @LastEditTime: 2021-02-04 14:29:10
 * @Description: 公共状态管理
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import UserInfo from '../model/User/UserInfo';
import UserConfig from '../model/User/UserConfig';
import SystemParam from '../model/System/SystemParam';

// 创建一个仓库实例
const store: any = new Vuex.Store({
    state: {
        userInfo: null as any, // 用户信息的初始状态值
        userConfig: null as any, // 用户配置的初始状态值
        systemParam: null as any, // 系统参数的初始状态值
    },
    getters: {

    },
    mutations: {
        changeUserInfo(state, data) { // 改变用户信息并保存到本地
            const userInfo = state.userInfo.get();

            state.userInfo = new UserInfo({
                ...userInfo,
                ...data
            });

            state.userInfo.save();
        },
        removeUserInfo(state) { // 清空本地中的用户信息
            state.userInfo = new UserInfo({});

            state.userInfo.remove();
        },
        changeUserConfig(state, data) { // 改变用户配置并保存到本地
            const userConfig = state.userConfig.get();

            state.userConfig.list = state.userConfig.setConfigValue(data).map(e => e.toJson());

            state.userConfig = new UserConfig({
                ...userConfig,
                ...state.userConfig.toJson()
            });

            state.userConfig.save();
        },
        removeUserConfig(state) { // 清空本地中的用户配置
            state.userConfig = new UserConfig({});

            state.userConfig.remove();
        },
        changeSystemParam(state, data) { // 改变系统参数并保存到本地
            const systemParam = state.systemParam.get();

            state.systemParam = new SystemParam({
                ...systemParam,
                ...data
            });

            state.systemParam.save();
        },
        removeSystemParam(state) { // 清空本地中的系统参数
            state.systemParam = new SystemParam({});

            state.systemParam.remove();
        }
    }
});

// 初始化状态参数
store.initState = function () {
    this.state.userInfo = new UserInfo({}).init();
    this.state.userConfig = new UserConfig({}).init();
    this.state.systemParam = new SystemParam({}).init();
}

export default store;