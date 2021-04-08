/*
 * @Author: huxudong
 * @Date: 2020-12-21 16:00:23
 * @LastEditTime: 2021-04-06 14:59:00
 * @Description: 菜单状态
 */
import Storage from '../Utils/Storage';

class MenuState extends Storage {
    private _menuList: any[] = []; // 菜单列表
    public get menuList(): any[] {
        return this._menuList;
    }
    public set menuList(value: any[]) {
        this._menuList = value || [];
    }

    private _currentMenuId: string = ''; // 当前显示的菜单Id
    public get currentMenuId(): string {
        return this._currentMenuId;
    }
    public set currentMenuId(value: string) {
        this._currentMenuId = value || '';
    }

    private _currentMenuURL: string = ''; // 当前显示的菜单地址
    public get currentMenuURL(): string {
        return this._currentMenuURL;
    }
    public set currentMenuURL(value: string) {
        this._currentMenuURL = value || '';
    }

    constructor(result: any) {
        super({
            storageType: 'sessionStorage',
            storageKey: 'menuState'
        });

        const { menuList, currentMenuId, currentMenuURL } = result;

        this.menuList = menuList;
        this.currentMenuId = currentMenuId;
        this.currentMenuURL = currentMenuURL;
    }
}

export default MenuState;