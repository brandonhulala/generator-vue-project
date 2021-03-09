/*
 * @Author: huxudong
 * @Date: 2021-01-14 14:22:44
 * @LastEditTime: 2021-02-23 09:11:13
 * @Description: 路由配置
 */
import router from 'lib/CommonRouter';
import { AuthCode } from 'bisConfig';

import { DemoIndex } from 'routeConfig';

// 配置子路由
router.addRoutes([
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        component: DemoIndex,
        name: 'demoIndex',
        meta: {
            text: '例子'
        }
    }
]);

// 配置权限码
router.authCode = AuthCode.DEMO;

export default router;