/*
 * @Author: huxudong
 * @Date: 2020-12-09 18:38:06
 * @LastEditTime: 2021-03-04 08:49:13
 * @Description: eslint配置文件
 */
module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"@vue/typescript"
	],
	globals: {
		window: true,
		document: true
	},
	rules: {
		"no-string-literal": 0, // 关闭抛出异常的检测
		"no-useless-escape": 0, // 关闭转义字符的检测
		"no-console": 0, // 关闭console检测
		"no-debugger": 0, // 关闭debugger检测
		"no-irregular-whitespace": 0, // 关闭空格检测
		"no-async-promise-executor": 0, // 关闭异步函数检测
		"no-cond-assign": 0, // 关闭赋值语句的检测
		"no-unreachable": 0, // 关闭不被执行的语句检测
	},
	parserOptions: {
		parser: "@typescript-eslint/parser"
	}
}