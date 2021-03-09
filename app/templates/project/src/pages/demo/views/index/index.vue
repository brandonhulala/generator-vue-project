<!--
 * @Author: huxudong
 * @Date: 2021-01-14 14:32:31
 * @LastEditTime: 2021-02-23 17:08:05
 * @Description: 例子
-->
<template>
    <div class="demo">
        <img :src="logo" alt="" />
        <h1>欢迎使用兆日科技运营平台~</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logo: require("assets/img/sinosun.png"),
        };
    },
};
</script>

<style src="./index.less" lang="less" scoped></style>