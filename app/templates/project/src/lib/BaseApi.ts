/*
 * @Author: huxudong
 * @Date: 2020-12-09 18:38:14
 * @LastEditTime: 2021-04-13 10:07:01
 * @Description: 基础接口类，业务服务都是基于这个类来发送请求
 */
import BaseRequest from 'sinosun-operation-ui/lib/NetApi/BaseRequest'; // 基础请求类
import BaseResponse from 'sinosun-operation-ui/lib/NetApi/BaseResponse'; // 基础响应类
import store from './CommonStore'; // 参数管理

class BaseApi extends BaseRequest {
    // 获取接口类型
    getApiType(): string {
        return store.state.systemParam.reqApiType;
    }

    // 获取路径前缀
    getPathPrefix(): string {
        return store.state.systemParam.pathPrefix;
    }

    // 获取基础路径
    getBaseURL(): string {
        return store.state.systemParam.baseURL;
    }

    // 获取身份令牌
    getToken(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const { tokenType } = store.state.systemParam;
            let token = '';

            // 获取顶层窗口上的公共方法
            const CommonKeycloak = top['CommonKeycloak'];

            // 如果没有，前端不校验token的有效期
            if (!CommonKeycloak) {
                token = store.state.userInfo.token;
            }
            // 如果有，前端校验token的有效期，如果过期，就要给token续期
            else {
                token = await CommonKeycloak.checkToken();
            }

            resolve(`${tokenType} ${token}`);
        });
    }

    // 请求是否加解密
    getIsCrypt(): boolean {
        // 本地开发环境，不加密
        if (process.env.NODE_ENV == 'development') {
            return false;
        }
        // 线上生产环境，由系统配置参数来决定是否加密
        else {
            return store.state.systemParam.isReqCrypt;
        }
    }
}

// 只在开发环境下引入mock数据
if (process.env.NODE_ENV == 'development') {
    const getMockData = require('../mock/getMockData');

    BaseApi['doGet_mock'] = function (url: string, param?: any): Promise<BaseResponse> {
        return getMockData(url);
    }
    BaseApi['doPut_mock'] = function (url: string, param?: any): Promise<BaseResponse> {
        return getMockData(url);
    }
}

export default BaseApi;