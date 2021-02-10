/*
 * @Author: huxudong
 * @Date: 2021-01-14 14:44:33
 * @LastEditTime: 2021-01-21 14:57:03
 * @Description: vue中使用ts的配置文件
 */
//  告诉 TypeScript *.vue 后缀的文件可以交给vue模块来处理
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module "*.less" {
    const less: any;
    export default less;
}
