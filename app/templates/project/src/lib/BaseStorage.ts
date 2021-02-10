/*
 * @Author: huxudong
 * @Date: 2021-01-15 08:39:19
 * @LastEditTime: 2021-02-04 14:28:50
 * @Description: 基础存储类，顶部窗口和子窗口都是基于这个类来实现本地存储
 */
import StorageUtil from 'sinosun-operation-ui/lib/utils/StorageUtil';

class BaseStorage extends StorageUtil {
    // 在线上环境，为了避免同一个域下不同系统之间的参数影响，给存储名添加后缀
    formatKey(key: string): string {
        const CommonApi = top['CommonApi'];
        if (!CommonApi) {
            return key;
        } else {
            return CommonApi.formatStorageKey(key);
        }
    }
    // 在线上环境，取出参数之后需要解密
    encrypt(value: string): string {
        const CommonApi = top['CommonApi'];
        if (!CommonApi) {
            return value;
        } else {
            return CommonApi.encryptStorageValue(value);
        }
    }
    // 在线上环境，设置参数之前需要加密
    decrypt(value: string): string {
        const CommonApi = top['CommonApi'];
        if (!CommonApi) {
            return value;
        } else {
            return CommonApi.decryptStorageValue(value);
        }
    }
}

export default new BaseStorage();