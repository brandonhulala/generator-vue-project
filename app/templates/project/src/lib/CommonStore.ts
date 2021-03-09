/*
 * @Author: huxudong
 * @Date: 2020-12-08 17:23:55
 * @LastEditTime: 2021-03-03 17:39:23
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
            const userInfo = {
                ...state.userInfo.get(),
                ...state.userInfo.toJson(),
                ...data
            }

            state.userInfo.set(userInfo);
            state.userInfo = new UserInfo(userInfo);
        },
        removeUserInfo(state) { // 清空本地中的用户信息
            state.userInfo.set('');
            state.userInfo = new UserInfo({});
        },
        changeUserConfig(state, data) { // 改变用户配置并保存到本地
            const userConfig = {
                ...state.userConfig.get(),
                ...state.userConfig.toJson(),
                list: state.userConfig.setConfigValue(data).map(e => e.toJson()),
            }

            state.userConfig.set(userConfig);
            state.userConfig = new UserConfig(userConfig);
        },
        removeUserConfig(state) { // 清空本地中的用户配置
            state.userConfig.set('');
            state.userConfig = new UserConfig({});
        },
        changeSystemParam(state, data) { // 改变系统参数并保存到本地
            const systemParam = {
                ...state.systemParam.get(),
                ...state.systemParam.toJson(),
                ...data
            }

            state.systemParam.set(systemParam);
            state.systemParam = new SystemParam(systemParam);
        },
        removeSystemParam(state) { // 清空本地中的系统参数
            state.systemParam.set('');
            state.systemParam = new SystemParam({});
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