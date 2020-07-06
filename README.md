# 内侧APP 发布平台

* 支持 Android 应用 和 iOS 应用
* iOS 应用安装需要使用 https 协议
* 需要使用代理转发层做 https 服务 eg: Nginx

## 部署方式
```bash
go build main.go app-publish
# 打包 
# app-publish
# conf
# storage
# views 
# 到发布机

# 配置文件修改
# vim conf/app.conf
# APP 名称
appname = app-publish
# 程序运行端口
httpport = 8080
# 运行模式
runmode = dev
# 监听地址
httpaddr = 0.0.0.0
# host 显示
host = "127.0.0.1:8080"

####MySQL 数据库配置####
db_host = 127.0.0.1
db_port = 3306
db_database = app_publish
db_username = root
db_password = gaoyansing


# 添加数据库 
create database app_publish default character set utf8mb4 collate utf8mb4_unicode_ci;
use app_publish;
source < ~/path/sql.sql

# 运行程序
# 配置 Nginx 转发 (如果不做iOS应用分发则普通端口运行即可)
```