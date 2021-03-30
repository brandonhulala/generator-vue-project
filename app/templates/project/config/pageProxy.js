/*
 * @Author: huxudong
 * @Date: 2020-12-30 11:29:40
 * @LastEditTime: 2021-03-30 09:14:25
 * @Description: 页面上的代理选项
 */
module.exports = {
    // operation
    '/bizmate/static/operation': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        pathRewrite: {
            '^/bizmate/static/operation': ''
        },
    },

    // policy
    '/bizmate/static/policy': {
        target: 'http://localhost:8082/',
        changeOrigin: true,
        pathRewrite: {
            '^/bizmate/static/policy': ''
        },
    },

    // content
    '/bizmate/static/content': {
        target: 'http://localhost:8083/',
        changeOrigin: true,
        pathRewrite: {
            '^/bizmate/static/content': ''
        },
    }
}
