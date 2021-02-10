/*
 * @Author: huxudong
 * @Date: 2020-09-15 09:25:50
 * @LastEditTime: 2021-01-21 14:54:00
 * @Description: 弹框
 */
class Modal {
    private _isShow: boolean = false; // 是否显示操作弹框
    public get isShow(): boolean {
        return this._isShow;
    }
    public set isShow(value: boolean) {
        this._isShow = value || false;
    }

    private _title: string = ''; // 弹框标题 
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value || '';
    }

    // 设置标题
    setTitle(title: string) {
        this.title = title;
    }
    // 显示
    showModal(): void {
        this.isShow = true;
    }
    // 隐藏
    hideModal(): void {
        this.isShow = false;
    }
}

export default Modal;