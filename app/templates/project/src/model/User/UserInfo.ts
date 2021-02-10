/*
 * @Author: huxudong
 * @Date: 2021-01-14 13:56:44
 * @LastEditTime: 2021-01-21 14:53:35
 * @Description: 用户信息
 */
import Storage from '../Utils/Storage';

class UserInfo extends Storage {
    private _token: string = ''; // 登录成功后返回的标识
    public get token(): string {
        return this._token;
    }
    public set token(value: string) {
        this._token = value || '';
    }

    private _bizMateId: string = ''; // 用户ID
    public get bizMateId(): string {
        return this._bizMateId;
    }
    public set bizMateId(value: string) {
        this._bizMateId = value || '';
    }

    private _userName: string = ''; // 用户名
    public get userName(): string {
        return this._userName;
    }
    public set userName(value: string) {
        this._userName = value || '';
    }

    private _orgInfo: any = null; // 用户所属企业的信息，包含orgId和orgName
    public get orgInfo(): any {
        return this._orgInfo;
    }
    public set orgInfo(value: any) {
        this._orgInfo = value || null;
    }

    private _deptInfo: any = null; // 用户所属部门的信息，包含deptId和deptName
    public get deptInfo(): any {
        return this._deptInfo;
    }
    public set deptInfo(value: any) {
        this._deptInfo = value || null;
    }

    private _roleList: any[] = []; // 用户拥有的角色列表，每个角色包含roleId和roleName
    public get roleList(): any[] {
        return this._roleList;
    }
    public set roleList(value: any[]) {
        this._roleList = value || [];
    }

    constructor(result: any) {
        super({
            storageType: 'localStorage',
            storageKey: 'userInfo'
        });

        const { token, bizMateId, userName, orgInfo, deptInfo, roleList } = result;

        this.token = token;
        this.bizMateId = bizMateId;
        this.userName = userName;
        this.orgInfo = orgInfo;
        this.deptInfo = deptInfo;
        this.roleList = roleList;
    }
}

export default UserInfo;