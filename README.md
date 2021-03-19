<!--
 * @Author: huxudong
 * @Date: 2021-01-22 10:38:02
 * @LastEditTime: 2021-03-19 10:34:00
 * @Description: 使用说明
-->
## 功能介绍
  + 提供运营平台的前端脚手架
  + 通过命令生成前端项目工程
  
## 脚手架结构
``` 
 |--app                       # 公共方法
    |--templates/project        # 项目模板
    |--index.js                 # 脚手架生成器
 |--packge.json               # 脚手架配置文件
 |--node_modules              # 第三方依赖
```

## 生成项目
  + 修改全局npm配置
    ```
    npm config set registry http://10.0.5.26:8081/repository/sinosun-front-npm-group/
    ```
  + 全局安装yo
    ```
    npm install -g yo
    ```
  + 全局安装脚手架
    ```
    npm install -g generator-sinosun-operation
    ```
  + 使用脚手架生成项目
    ```
    yo sinosun-operation
    ```
