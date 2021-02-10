/*
 * @Author: huxudong
 * @Date: 2020-10-23 11:06:49
 * @LastEditTime: 2021-02-07 09:53:30
 * @Description: 用户相关的接口
 */
import BaseApi from '../lib/BaseApi';
import BaseResponse from 'sinosun-operation-ui/lib/NetApi/BaseResponse';
import ApiUrl from './ApiUrl';

class UserApi extends BaseApi {
    // 用户相关的业务错误码
    getBisErrorDesc(resultCode: number): string {
        switch (resultCode) {
            case 80116007:
                return '用户不存在';
            default:
                return '';
        }
    }

    // 获取用户信息
    getUserInfo(bizMateId: string): Promise<BaseResponse> {
        return this.doGet(ApiUrl.GET_USER_INFO, {
            bizMateId
        }).then(res => {
            if (res.isSuccess()) {
                const { bizMateId } = res.result;

                // 返回的bizMateId就是用户名称
                res.result.userName = bizMateId;
            }

            return res;
        });
    }
}

export default new UserApi();