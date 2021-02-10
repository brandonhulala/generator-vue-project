/*
 * @Author: huxudong
 * @Date: 2021-01-14 14:40:55
 * @LastEditTime: 2021-01-21 14:54:45
 * @Description: 整个项目的接口请求路径
 */
enum ApiUrl {
    // 用户
    GET_USER_INFO = '/user/v1/getInfo', // 查询用户信息

    // 上传
    UPLOAD_IMG = '/presign/v1/getAssistantUploadPresignUrls', // 上传图片
}

export default ApiUrl;