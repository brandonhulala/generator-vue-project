/*
 * @Author: huxudong
 * @Date: 2020-12-23 12:21:56
 * @LastEditTime: 2021-01-21 14:53:52
 * @Description: 用于继承多个父类
 */

// 复制类的属性
function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name' && key !== 'length') {
            let desc: any = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, desc)
        }
    }
}

export default function mix(...mixins) {
    class Mix {
        constructor(...args) {
            for (let mixin of mixins) {
                copyProperties(this, new mixin(...args)); // 拷贝实例属性
            }
        }
    }
    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
    return Mix;
}
