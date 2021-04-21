###
 # @Description: 
 # @FilePath: \approval\make-package.sh
### 
#! /bin/bash

#从指定json文件中读取指定key的 value
function getJsonValue()
{
    local fileName=$1
    local key=$2

    local value=$(echo -e $(cat $fileName | awk -F "[$key]" "/$key/{print\$0}"))
    
    value=$(echo $value | awk -F "[:]" "/$key/{print\$2}")    # 输出："3.6.4",
#    echo "value2:$value"
    value=${value:2}      # 输出 3.6.4", xxxx ,
#    echo "value3:$value"

    value=${value%%\,*}   # 输出 3.6.4"
#    echo "value4:$value"

    value=${value%\"*}    # 输出：3.6.4
    echo ${value}
}

# 1.选择仓库地址，默认使用家里（10.0.5.26:8081）的源，如要切换则通过命令参数输入
npm_registry=http://10.0.5.26:8081/repository/sinosun-front-npm-group/
sass_binary_site=http://10.0.5.26:8081/repository/sinosun-front-npm-raw-proxy/
if [ -n "$1" ]
then
    npm_registry=$1
fi
if [ -n "$2" ]
then
    sass_binary_site=$2
fi
echo npm registry: $npm_registry
echo sass_binary_site: $sass_binary_site

# 2.安装 node_moudles
npm config set sass-binary-site $sass_binary_site
npm install --registry=$npm_registry --unsafe-perm

# 3.npm 打包
echo -e "\033[32m npm run build please wait ... \033[0m"
npm run build

# 4.package name 规范
product_path="$(ls dist)"
# 取当前文件夹名称作为product_name，不合适，改成从项目的package.json来获取"name"对应的 value
#product_name=$(basename "$PWD")
product_name=$(getJsonValue "package.json" "name")
version=$(getJsonValue "package.json" "version")

time_str=$(date "+%Y%m%d")
# package_name="bizmate-static-${product_name}-$version+${time_str}.zip" 按照规范 zip 换成 tar
package_name="bizmate-static-${product_name}-$version+${time_str}.tar"
echo "application-name=${product_path}  version=$version  package-name=${package_name}  path=$(pwd)/${package_name}"

# 5.打包 项目
if [ -n "${product_path}" ];then
  echo "build in dist: ${product_path}"
  cp -r dist/${product_path} .
  # zip -r ${package_name} ${product_path}
  tar czvf ${package_name} ${product_path}

  echo -e "application-name=${product_path}\nversion=$version\npackage-name=${package_name}\npath=$(pwd)/${package_name}" > product-info.txt
  mkdir devops_deploy
  cp product-info.txt devops_deploy
  tar cvf devops_deploy.tar devops_deploy
else
  echo "build failed"
fi
