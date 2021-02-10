/*
 * @Author: huxudong
 * @Date: 2021-01-14 14:44:33
 * @LastEditTime: 2021-01-21 14:58:16
 * @Description: vue中使用jsx的配置文件
 */
import Vue, { VNode } from 'vue';

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode { }
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue { }
        interface IntrinsicElements {
            [elem: string]: any
        }
    }
}

// 支持在vue组件上使用特定的属性
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        [propName: string]: any;
        ref?: string;
    }
}
