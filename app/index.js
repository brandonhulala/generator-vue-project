/*
 * @Author: huxudong
 * @Date: 2021-01-22 10:19:10
 * @LastEditTime: 2021-02-07 15:42:37
 * @Description: 脚手架生成器
 */
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
    // 初始化
    initializing() {
        // 项目属性的默认值
        this.props = {
            name: '',
            version: '0.0.1',
            description: '',
            author: ''
        };
    }

    // 接收用户输入
    prompting() {
        // 问题
        const questions = [
            {
                type: "input",
                name: "name",
                message: "请输入项目的英文名",
            },
            {
                type: "input",
                name: "version",
                message: "请输入项目的版本号",
                default: this.props.version
            },
            {
                type: "input",
                name: "description",
                message: "请输入项目的描述信息",
            },
            {
                type: "input",
                name: "author",
                message: "请输入项目的作者名称",
            }
        ]

        // 根据回答，生成新的项目属性
        return this.prompt(questions).then((answers) => {
            const { name } = answers;
            if (!name) {
                throw new Error('项目名称不能为空');
            } else {
                const fileList = fs.readdirSync('./');
                if (fileList.find(e => e == name)) {
                    throw new Error('当前目录下存在同名项目');
                } else {
                    this.props = answers;
                }
            }
        });
    }

    // 创建项目目录
    default() {
        const { name } = this.props;
        if (path.basename(this.destinationPath()) !== name) {
            mkdirp(name);
            this.destinationRoot(this.destinationPath(name));
        }
    }

    // 写入项目文件
    writing() {
        // 将模板文件复制到输出目录，并替换文件中的变量
        this.fs.copyTpl(
            this.templatePath("project/"),
            this.destinationPath(""),
            this.props,
            {},
            {
                globOptions: { dot: true }
            }
        );

        // 重命名文件，去掉下划线前缀
        this.fs.move(
            this.destinationPath("_package.json"),
            this.destinationPath("package.json"),
        );
    }
}