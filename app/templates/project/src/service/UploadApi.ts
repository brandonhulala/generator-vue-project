/*
 * @Author: huxudong
 * @Date: 2020-12-04 15:04:05
 * @LastEditTime: 2021-02-07 09:56:46
 * @Description: 上传相关的接口
 */
import BaseApi from '../lib/BaseApi';
import BaseResponse from 'sinosun-operation-ui/lib/NetApi/BaseResponse';
import ApiUrl from './ApiUrl';
import SystemParam from '../model/System/SystemParam';
import { MimeType } from 'sinosun-operation-ui/lib/utils/fileUtil';
import { transferUpLoadUrl } from '../lib/extend';

class UploadApi extends BaseApi {
    // 获取文件上传地址
    getUploadAddress(fileList: any, url?: string): Promise<BaseResponse> {
        return this.doPost(url || ApiUrl.UPLOAD_IMG, fileList).then(res => {
            if (res.isSuccess()) {
                const { presignedObjects } = res.result;

                res.result.addressList = presignedObjects ? presignedObjects.map(e => e.presignedUrls) : [];
            }

            return res;
        });
    }

    // 将文件上传到服务器
    doUpload(file: any, address: any): Promise<BaseResponse> {
        const { upload, download } = address;

        const { pathPrefix } = new SystemParam({}).init();
        const uploadUrl = transferUpLoadUrl(upload);

        let fileType = file.type, fileName = file.name;
        if (!fileType) {
            let fileExt = fileName.substring(fileName.lastIndexOf('.'));
            fileType = MimeType[fileExt];
        }

        return this.doPut(uploadUrl, file, {
            'Content-Type': fileType,
        }, {
            apiType: '0',
            baseURL: pathPrefix,
            token: '',
            timeout: 1000 * 60 * 3
        }).then(res => {
            if (res.isSuccess()) {
                res.result.download = download;
            }

            return res;
        });
    }

    // 将上面两步合成一步 
    async uploadFile(file: any, url?: string): Promise<any> {
        let fileType = file.type, fileName = file.name;
        if (!fileType) {
            let fileExt = fileName.substring(fileName.lastIndexOf('.'));
            fileType = MimeType[fileExt];
        }

        const address = await this.getUploadAddress(
            [
                {
                    fileName,
                    contentType: fileType,
                    isNeedThumb: true
                }
            ],
            url
        ).then(res => {
            if (res.isSuccess()) {
                return res.result.addressList[0];
            } else {
                throw new Error(res.resultMessage);
            }
        })

        return this.doUpload(file, address).then(res => {
            if (res.isSuccess()) {
                return res.result.download;
            } else {
                throw new Error(res.resultMessage);
            }
        })
    }
}

export default new UploadApi();