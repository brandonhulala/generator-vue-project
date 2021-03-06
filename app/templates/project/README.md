<!--
 * @Author: huxudong
 * @Date: 2020-12-09 18:38:06
 * @LastEditTime: 2021-04-13 14:20:58
 * @Description: 使用说明
-->
## 项目结构
```  
webpack
 |--build                       # webpack配置文件
 |--config                      # webpack可配置选项
 |--bankConfig                  # 从src中抽离出来的可配置选项
    |--bisConfig                  # 业务配置
    |--routeConfig.js             # 路由配置
 |--customSrc                   # 基于src的定制目录
 |--src                         # 项目的开发目录
    |--assets                     # 项目的静态资源，参与webpack的编译
    |--external                   # 项目的外部资源，不参与webpack的编译
    |--lib                        # 项目的公共脚本
      |--BaseApi.ts                 # 公共请求
      |--BaseStorage.ts             # 公共存储
      |--CommonRouter.ts            # 公共路由
      |--CommonStore.ts             # 公共状态
      |--extend.ts                  # 扩展方法
    |--components                 # 项目的公共组件
    |--model                      # 项目的数据模型   
      |--User                       # 用户类
      |--System                     # 系统类
      |--Utils                      # 工具类
    |--service                    # 项目的接口交互
      |--ApiUrl.ts                  # 接口路径
      |--User.ts                    # 用户接口
      |--Upload.ts                  # 文件上传接口
    |--mock                       # 项目的虚拟接口数据     
    |--pages                      # 项目的页面模块，每个子目录对应一个vue单页面
      |--.html                      # 模板文件
      |--.js                        # 入口文件
      |--.less                      # 根样式
      |--.vue                       # 根组件
      |--router                     # 路由配置
      |--views                      # 路由组件
      |--store                      # 状态管理
      |--components                 # 复用组件
    |--shims-vue.d.ts             # TypeScript识别.vue文件
    |--shims-tsx.d.ts             # 允许在vue中编写.tsx文件
  |--package.json               # 项目配置文件，包含项目的名称、版本号、命令行、第三方依赖等
  |--tsconfig.json              # typescript配置文件
  |--babel.config.js            # babel配置文件
  |--.eslintrc.js               # eslint配置文件
  |--.eslintignore              # eslint忽略的文件列表
  |--.gitignore                 # git忽略的文件列表
  |--postcss.config.js          # postcsss配置文件
  |--.editorconfig              # 编辑器配置文件
  |--INSTALL.txt                # 项目安装说明
  |--CHANGELOG.txt              # 项目版本日志
  |--make-package.sh            # 项目自动化打包
  |--deploy.sh                  # 项目自动化部署
```

## 配置要求
  + webpack：4+
  + babel：7+
  + babel-loader：8+
  + core-js：3+（还要安装regenerator-runtime，用于替换babel-polyfill）
  + less-loader: 5+
  + autoprefixer: 9+
  + vue：2.5+
  + vue-loader：15+
  + vue-router：2+
  + axios：0.16.2

## 开发规范
  + 项目
    - 先要完善packge.json文件中的name、version、description、page、port
    - 基于项目的基本信息，修改CHANGELOG和INSTALL文件的名称和内容 
    - 在bankConfig/bisConfig目录中，添加项目的业务配置
    - 在src/model目录中，添加项目的数据模型
    - 在src/service目录中，添加项目的接口交互
  + 页面
    - 在src/pages目录下新建目录，每个目录对应一个页面，目录名就是页面名
    - 在bankConfig/routeConfig.js文件中，配置该页面中的路由引用
    - 如果要定制页面，就要在customSrc中添加该页面的定制目录
  + 模块
    - 规范：尽量使用ES6的import和export，如果不是在顶部引入，可以使用require
    - 引入：尽量使用模块别名，尽量使用按需加载
  + 样式
    - 不加scoped属性，是作用于整个页面的全局样式，使用时一定要注意样式的全局污染
    - 添加scoped属性，是专属于当前组件的局部样式，如果要覆盖某些内部组件或者第三方组件的样式，使用/deep/
    - 可以将样式从style标签中提取出来放在一个单独的样式文件中，然后使用src属性进行引入

## 命令
  + 配置
    ```
    npm config set registry http://10.0.5.26:8081/repository/sinosun-front-npm-group/
    ```
  + 安装
    ```
    npm install 
    ```
  + 开发
    ```
    npm run dev
    ```
  + 构建
    ```
    npm run build
    ```

## 注意
  + 运营平台的项目分成两种：顶部的主项目和iframe中的子项目
    - 顶部项目会在top对象上绑定一些公共方法，给子项目使用
    - 如果需要在子项目中将这些公共方法存起来，请存为一个全局变量，切记不要存入某个vue的data或者某个ts的类中，否则IE浏览器上就会报错
    - 顶部项目会在localStorage中存放一些公共参数，给子项目使用
    - 在子项目的公共参数的model中，只需要定义当前项目用到的实例属性
  + 通常情况下，子项目的运行需要用到顶部项目的公共参数，在本地启动子项目之后，由于获取不到顶部项目，页面会报错，目前的解决方案有2种
    - 方法一：将顶部项目的公共参数手动复制到子项目
      - 首先，在浏览器上打开线上dev环境的运营平台，登录成功之后，打开浏览器的控制台
      - 然后，在控制台上输入CommonApi.getPlatformParam()，获取顶部主项目所有的公共参数
      - 接着，将userInfo和systemParam复制到本地子项目的localStorage中，然后刷新子项目的页面
      - 注意，如果公共参数的名称里面有系统后缀名，复制到localStorage的时候，需要把系统后缀名删掉
    - 方法二：在本地同时启动顶部项目和子项目
      - (1)对于顶部项目
        - package.json文件中的port默认为8081
        - 在config/pageProxy.js文件中，配置并导出子项目的反向代理，端口号不能冲突
        - 在config/index.js文件中，引入子项目的反向代理，然后追加到dev下的proxy，注意要放在其他代理的前面
      - (2)对于子项目
        - package.json文件中的port不能为8081，并且要与顶部项目config/pageProxy.js中的代理端口保持一致
        - 在config/index.js文件中，将dev中的assetsPublicPath改成`http://${ipv4}:${package.port}/`
        - 在build/webpack.base.config.js文件中，在字体图标的loader的options中添加
          ```publicPath: config.webpack.isProd ? config.build.extractPublicPath : '/'```
        - 在build/webpack.dev.config.js文件中，在devServer中添加headers配置
          ```
          headers: {
              'Access-Control-Allow-Origin': '*'
          }
          ```


