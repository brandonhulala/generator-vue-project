<!--
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-19 10:58:32
 * @Description: 测试页面
-->
<script>
import Demo from "@/pages/demo/demo.vue";

export default {
    extends: Demo,
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

<style src="./demo.less" lang="less" scoped></style>