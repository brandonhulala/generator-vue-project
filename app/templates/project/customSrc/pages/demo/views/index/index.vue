<!--
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-02-23 09:16:57
 * @Description: 例子
-->
<script>
import DemoIndex from "@/pages/demo/views/index/index.vue";

export default {
    extends: DemoIndex,
    created() {
        this.myFn();
    },
    methods: {
        myFn() {
            console.log("这里是可定制的部分");
        },
    },
};
</script>

<style src="./index.less" lang="less" scoped></style>