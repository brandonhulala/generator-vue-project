/*
 * @Author: huxudong
 * @Date: 2021-01-14 13:41:02
 * @LastEditTime: 2021-02-04 14:12:14
 * @Description: 模拟接口返回数据
 */
import ApiUrl from '../service/ApiUrl';
import BaseResponse from 'sinosun-operation-ui/lib/NetApi/BaseResponse';
import Mock from "mockjs";

// 扩展Mock
Mock.Random.extend({
    phone() {
        return Mock.mock(/(1)\d{10}/);
    }
});

// 返回数据
export default function (url: string): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
        const baseResponse = new BaseResponse(0);

        let result: any = null;
        switch (url) {
            case ApiUrl.GET_USER_INFO:
                result = {
                    "bizMateId": "sinosun",
                    "name": "sinosun",
                    "nickName": "sinosun",
                    "orgList": [
                        {
                            "orgId": "206c5684-850a-4c79-9b40-09d883233a08",
                            "orgName": "厦门国际股份有限公司",
                        }
                    ]
                }
                break;
        }
        baseResponse.result = result;
        baseResponse.resultMessage = '这是mock数据';

        resolve(baseResponse);
    });
}