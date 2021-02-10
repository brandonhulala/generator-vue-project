/*
 * @Author: huxudong
 * @Date: 2020-11-13 18:09:27
 * @LastEditTime: 2021-02-07 11:22:45
 * @Description: 分页参数
 */
import store from '../../lib/CommonStore';

class PageParam {
    private _pageIndex: number = 0; // 请求的页码数
    public get pageIndex(): number {
        return this._pageIndex;
    }
    public set pageIndex(value: number) {
        this._pageIndex = typeof value == 'undefined' ? 1 : value;
    }

    private _pageSize: number = 0; // 请求的每页数
    public get pageSize(): number {
        return this._pageSize;
    }
    public set pageSize(value: number) {
        this._pageSize = value || 0;
    }

    private _total: number = 0; // 总条数
    public get total(): number {
        return this._total;
    }
    public set total(value: number) {
        this._total = value || 0;
    }

    private _totalPage: number = 0; // 总页数
    public get totalPage(): number {
        return this._totalPage;
    }
    public set totalPage(value: number) {
        this._totalPage = value || 0;
    }

    private _pageSizeConfig: number[] = []; // 每页显示条数配置
    public get pageSizeConfig(): number[] {
        return this._pageSizeConfig;
    }
    public set pageSizeConfig(value: number[]) {
        this._pageSizeConfig = value || store.state.systemParam.pageSizeConfig;
    }

    private _curPageTotalNum: number = 0; // 每页显示的条数
    public get curPageTotalNum(): number {
        return this._curPageTotalNum;
    }
    public set curPageTotalNum(value: number) {
        this._curPageTotalNum = value || 0;
    }

    constructor(result: any) {
        const { pageIndex, pageSize, total, totalPage, pageSizeConfig, curPageTotalNum } = result;

        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.total = total;
        this.totalPage = totalPage;
        this.pageSizeConfig = pageSizeConfig;
        this.curPageTotalNum = curPageTotalNum;
    }

    // 添加一条
    addOne(): void {
        this.total++;
        if (Math.floor(this.total / this.pageSize) > this.pageIndex) this.totalPage++;
    }

    // 删除一条
    delOne(minimum: number = 1): void {
        this.total = this.total > 0 ? this.total - 1 : 0;
        if (this.curPageTotalNum > minimum) this.pageIndex--;
    }
}

export default PageParam;