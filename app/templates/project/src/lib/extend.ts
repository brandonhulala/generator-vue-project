/*
 * @Author: huxudong
 * @Date: 2021-01-07 17:28:09
 * @LastEditTime: 2021-02-04 14:28:29
 * @Description: 业务扩展方法
 */
import store from './CommonStore';

// 转换局域网下的链接
export function transferUpLoadUrl(url: string): string {
    const { intranetAccess } = store.state.systemParam;
    return intranetAccess ? `${location.protocol}//${location.host}/${url.split('/').slice(3).join('/')}` : url;
}



