<!--
 * @Author: huxudong
 * @Date: 2021-01-14 14:32:31
 * @LastEditTime: 2021-02-07 09:45:50
 * @Description: 列表
-->
<template>
    <div class="demo-list">
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

<style src="./list.less" lang="less" scoped></style>