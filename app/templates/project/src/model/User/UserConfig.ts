/*
 * @Author: huxudong
 * @Date: 2020-12-21 16:00:23
 * @LastEditTime: 2021-01-21 14:52:49
 * @Description: 用户配置
 */
import Storage from '../Utils/Storage';

// 配置选项
class ConfigItem extends Storage {
    private _bizMateId: string = ''; // 用户ID
    public get bizMateId(): string {
        return this._bizMateId;
    }
    public set bizMateId(value: string) {
        this._bizMateId = value || '';
    }

    private _pageSize: number = 0; // 用户选择的每页条数
    public get pageSize(): number {
        return this._pageSize;
    }
    public set pageSize(value: number) {
        this._pageSize = value || 10;
    }

    constructor(result: any) {
        super({
            storageType: 'localStorage',
            storageKey: 'configItem'
        });

        const { bizMateId, pageSize } = result;

        this.bizMateId = bizMateId;
        this.pageSize = pageSize;
    }
}

class UserConfig extends Storage {
    private _list: ConfigItem[] = []; // 配置列表
    public get list(): ConfigItem[] {
        return this._list;
    }
    public set list(value: ConfigItem[]) {
        this._list = value;
    }

    constructor(result: any) {
        super({
            storageType: 'localStorage',
            storageKey: 'userConfig'
        });

        const { list } = result;

        this.list = list ? list.map(e => new ConfigItem(e)) : [];
    }

    // 获取某个配置参数的值
    getConfigValue(bizMateId: string, configName: string): any {
        const list = this.list;
        const item = list.find(e => e.bizMateId == bizMateId);

        if (!item) {
            const configItem = new ConfigItem({});
            return configItem[configName];
        } else {
            return item[configName];
        }
    }

    // 修改某个配置参数的值
    setConfigValue({ bizMateId, ...configObj }): any {
        const list = this.list;
        const item = list.find(e => e.bizMateId == bizMateId);

        if (!item) {
            const configItem = new ConfigItem({
                bizMateId
            });
            for (const configName in configObj) {
                configItem[configName] = configObj[configName];
            }
            list.push(configItem);
        } else {
            for (const configName in configObj) {
                item[configName] = configObj[configName];
            }
        }

        return list;
    }
}

export default UserConfig;