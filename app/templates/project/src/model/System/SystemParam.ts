/*
 * @Author: huxudong
 * @Date: 2021-01-14 13:56:44
 * @LastEditTime: 2021-02-04 14:40:29
 * @Description: 系统参数
 */
import Storage from '../Utils/Storage';

class SystemParam extends Storage {
    private _pathPrefix: string = ''; // 路径前缀
    public get pathPrefix(): string {
        return this._pathPrefix;
    }
    public set pathPrefix(value: string) {
        this._pathPrefix = value || '';
    }

    private _tokenType: string = ''; // token类型
    public get tokenType(): string {
        return this._tokenType;
    }
    public set tokenType(value: string) {
        this._tokenType = value || '';
    }

    private _pageSizeConfig: number[] = []; // 每页可供选择的条数
    public get pageSizeConfig(): number[] {
        return this._pageSizeConfig;
    }
    public set pageSizeConfig(value: number[]) {
        this._pageSizeConfig = value || [];
    }

    private _baseURL: string = ''; // 请求的抬头路径
    public get baseURL(): string {
        return this._baseURL;
    }
    public set baseURL(value: string) {
        this._baseURL = value || '';
    }

    private _intranetAccess: Boolean = false; // 上传下载是否是局域网
    public get intranetAccess(): Boolean {
        return this._intranetAccess;
    }
    public set intranetAccess(value: Boolean) {
        this._intranetAccess = value || false;
    }

    private _reqApiType: string = ''; // 请求的接口类型
    public get reqApiType(): string {
        return this._reqApiType;
    }
    public set reqApiType(value: string) {
        this._reqApiType = value || '';
    }

    private _isReqCrypt: boolean = false; // 请求是否加解密
    public get isReqCrypt(): boolean {
        return this._isReqCrypt;
    }
    public set isReqCrypt(value: boolean) {
        this._isReqCrypt = value || false;
    }

    constructor(result: any) {
        super({
            storageType: 'localStorage',
            storageKey: 'systemParam'
        });

        const { pathPrefix, tokenType, pageSizeConfig, baseURL, intranetAccess, reqApiType, isReqCrypt } = result;

        this.pathPrefix = pathPrefix;
        this.tokenType = tokenType;
        this.pageSizeConfig = pageSizeConfig;
        this.baseURL = baseURL;
        this.intranetAccess = intranetAccess;
        this.reqApiType = reqApiType;
        this.isReqCrypt = isReqCrypt;
    }
}

export default SystemParam;