<!--
 * @Author: huxudong
 * @Date: 2021-01-14 10:45:03
 * @LastEditTime: 2021-01-14 14:36:00
 * @Description: 列表页
-->
<script>
import DemoList from "@/pages/demo/views/list/list.vue";

export default {
    extends: DemoList,
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

<style src="./list.less" lang="less" scoped></style>