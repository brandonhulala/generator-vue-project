/*
 * @Author: huxudong
 * @Date: 2021-01-14 14:22:44
 * @LastEditTime: 2021-02-07 09:12:37
 * @Description: 路由配置
 */
import router from 'lib/CommonRouter';
import { AuthCode } from 'bisConfig';

import { DemoList } from 'pageConfig';

// 配置子路由
router.addRoutes([
    {
        path: '/',
        redirect: '/list',
    },
    { // 列表
        path: '/list',
        name: 'demoList',
        component: DemoList
    }
]);

// 配置权限码
router.authCode = AuthCode.DEMO;

export default router;