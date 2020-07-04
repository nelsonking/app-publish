package bootstrap

import (
	"app-publish/utils"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql" // import your used driver
	"os"
	"time"
)

func AutoRegister()  {
	registerDataBase()

	registerStaticDictionary()

	registerTplFunction()
}

// RegisterDataBase 注册数据库
func registerDataBase() {
	beego.Info("正在初始化数据库配置.")
	orm.DefaultTimeLoc = time.Local

	host := beego.AppConfig.String("db_host")
	database := beego.AppConfig.String("db_database")
	username := beego.AppConfig.String("db_username")
	password := beego.AppConfig.String("db_password")

	timezone := beego.AppConfig.String("timezone")
	location, err := time.LoadLocation(timezone)

	if err == nil {
		orm.DefaultTimeLoc = location
	} else {
		beego.Error("加载时区配置信息失败,请检查是否存在 ZONEINFO 环境变量->", err)
	}

	port := beego.AppConfig.String("db_port")

	dataSource := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4", username, password, host, port, database)

	if err := orm.RegisterDataBase("default", "mysql", dataSource); err != nil {
		beego.Error("注册默认数据库失败->", err)
		os.Exit(1)
	}


	beego.Info("数据库初始化完成.")
}

func registerStaticDictionary() {
	beego.Info("静态目录定义")

	beego.SetStaticPath("/storage","storage")

	beego.Info("静态目录定义完成")
}


//注册模板函数
func registerTplFunction() {
	_ = beego.AddFuncMap("FormatBytes", utils.FormatBytes)
	_ = beego.AddFuncMap("FormatTimeStamp", utils.FormatTimeStamp)
}

