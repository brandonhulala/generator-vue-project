#!/usr/bin/python2.7
# -*- coding: utf-8 -*-

import os
import sys
import traceback
import argparse
import re
import commands


"""
该脚本用于
打包部署静态代码
参数如下
-d          远程web服务器目录
-i          远程服务器ip地址
-p          安装包路径
--config    使用配置文件，并获取配置文件中的数值
命令范例如下
python deploy.py -i 10.0.5.201 -d /usr/local/SINO/jenkins/apache-tomcat-9.0.12/webapps/ROOT
"""


def _parse_cmd_args(args_list):
    """
    命令行参数
    :param args_list:
    :return: args
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--remote-dir", type=str, help="远程web服务器目录 ")
    parser.add_argument("--config", help='使用配置文件，并获取配置文件中的数值')
    parser.add_argument('-i', '--remote-ip', type=str, help="远程服务器ip地址")
    parser.add_argument("-p", "--package-path", type=str, help="安装包路径")
    args = parser.parse_args(args_list)
    if args.remote_dir is None or args.remote_ip is None :
        parser.print_help()
        raise Exception('Miss arguments')
    return args


def _get_info(info_file, match_key, separator=':'):
    """
    获取文件内容信息
    :param info_file:
    :return: dictionary {'version','git_sha'}
    """
    res_dict = {}
    with open(info_file, 'r') as f:
        for line in f.readlines():
            line = line.strip('\n')
            for key in match_key.split(','):
                if re.match(key, line, re.I):
                    match_value = line.split(separator)[1]
                    res_dict[key] = match_value
    return res_dict


def _uncompress_tar(package_path, des_path=None):
  """
  解压标准包
  :param package_path: 压缩包完整路径
  :return: current_dir, package_name, uncompress_dir
  """
  if des_path is None:
    current_dir = os.path.split(package_path)[0]
  else:
    current_dir = des_path
  package_name = os.path.split(package_path)[1]
  uncompress_dir = '.'.join(package_name.split('.')[:-1])
  uncompress_cmd = 'tar xf %s -C %s' % (package_path, current_dir)
  result, output = commands.getstatusoutput(uncompress_cmd)
  if result is not 0:
    raise Exception(output)
  return current_dir, package_name, uncompress_dir


def _do_deploy(args_list):
    '''
    部署静态包
    :param args_list:命令行参数
    修改zip包权限
    :return:
    '''
    args = _parse_cmd_args(args_list)
    build_dir = os.getcwd()
    devops_deploy_tar_file = os.path.join(build_dir, 'devops_deploy.tar')
    current_dir, package_name, uncompress_dir = _uncompress_tar(devops_deploy_tar_file)
    print('产品信息读取中...')
    prodcut_info_file = os.path.join(os.path.join(current_dir, uncompress_dir), 'product-info.txt')
    if args.package_path is None:
      args.package_path = _get_info(prodcut_info_file, 'path', '=')['path']
    application_name = str(_get_info(prodcut_info_file, 'application-name', '=')['application-name'])
    # application_dir = os.path.join(args.remote_dir,application_name)
    print('修改安装包权限...')
    chmod_cmd = 'chmod 755 %s' % args.package_path
    status, output = commands.getstatusoutput(chmod_cmd)
    if status != 0:
      raise Exception('修改文件权限失败%s' % devops_deploy_tar_file)
    print('部署中...')
    scp_cmd = "scp -rp %s root@%s:%s" %(args.package_path, args.remote_ip, args.remote_dir)
    status,output = commands.getstatusoutput(scp_cmd)
    if status != 0:
        raise Exception('copy %s failed' % args.package_path)
    package_name = os.path.split(args.package_path)[1]
    # 添加打印信息...
    # print('获取%s成功'%package_name)
    # 先删除之前部署的文件夹
    remote_delete_cmd = 'ssh %s "cd %s && rm -rf %s"' % (args.remote_ip, args.remote_dir, application_name)
    commands.getstatusoutput(remote_delete_cmd)
    remote_cmd = 'ssh %s "cd %s && unzip -o %s && rm -f %s "' % (args.remote_ip, args.remote_dir, package_name,package_name)
    commands.getstatusoutput(remote_cmd)
    print('执行修改文件权限')
    chmod_cmd = 'ssh %s "cd %s && chmod -R 755 %s/ "' % (args.remote_ip,args.remote_dir,application_name)
    # print('cmd:',chmod_cmd)
    status,output = commands.getstatusoutput(chmod_cmd)
    print(output)
    if status != 0:
      raise Exception('deploy %s failed' % package_name)
    else:
      print('部署成功')
      return True

def do_deploy(args):
    """
    对外暴露的接口，可供外部 python 程序调用
    :param args: list，和执行脚本时的命令行参数相同
    :return:  Boolean，是否成功的标志
    """
    try:
        return _do_deploy(args)
    except Exception:
        traceback.print_exc()
        print "render FAIL"
        return False


def do_test():
    args = []

def main(args):
    origin_work_dir = os.getcwd()
    try:
        os.chdir(sys.path[0])

        _do_deploy(args)
    finally:
        os.chdir(origin_work_dir)  # 将工作路径还原回去


if __name__ == '__main__':
    main(sys.argv[1:])
