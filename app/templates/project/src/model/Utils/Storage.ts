/*
 * @Author: huxudong
 * @Date: 2020-12-08 17:23:55
 * @LastEditTime: 2021-03-03 17:41:45
 * @Description: 存储
 */
import BaseStorage from '../../lib/BaseStorage';
import { formatJsonObj } from 'sinosun-operation-ui/lib/utils/commonUtil';

class Storage {
    private _storageType_: string = ''; // 存储类型
    public get storageType(): string {
        return this._storageType_;
    }
    public set storageType(value: string) {
        this._storageType_ = value || '';
    }

    private _storageKey_: string = ''; // 存储名称
    public get storageKey(): string {
        return this._storageKey_;
    }
    public set storageKey(value: string) {
        this._storageKey_ = value || '';
    }

    constructor(result: any) {
        const { storageType, storageKey } = result;

        this.storageType = storageType;
        this.storageKey = storageKey;
    }

    // 把当前实例的属性提取出来放在一个JSON对象中
    toJson(): any {
        return formatJsonObj(this);
    }
    // 取出本地参数
    get(key: string = ''): any {
        return BaseStorage.getStorage(this.storageType, this.storageKey, key ? [key] : [], true);
    }
    // 设置本地参数
    set(value: any = ''): void {
        BaseStorage.setStorage(this.storageType, this.storageKey, value);
    }
    // 初始化
    init(): any {
        const obj = this.get();

        // 如果本地没有这个参数，就取实例化的结果，并将结果存到本地
        if (!obj || !Object.keys(obj).length) {
            this.set(this.toJson());
            return this;
        }
        // 如果本地已有这个参数，就按这个参数的值进行实例化
        else {
            return this.constructor(obj);
        }
    }
}

export default Storage;