package routers

import (
	"app-publish/controllers"
	"github.com/astaxie/beego"
)

func init() {
	// 首页
	beego.Router("/", &controllers.IndexController{}, "*:Index")

	// APP 管理
	beego.Router("/app/upload", &controllers.AppController{}, "post:Upload")

	// APP列表
	beego.Router("/apps", &controllers.AppController{}, "get:Apps")

	// 安装ID
	beego.Router("/app/install/:id", &controllers.AppController{}, "get:Install")

	// 进入版本列表
	beego.Router("/app/manage/:appCode", &controllers.AppController{}, "get:Manage")

	// 版本列表
	beego.Router("/app/list/:appCode", &controllers.AppController{}, "post:List")

	// APP安装页面
	beego.Router("/app/:appCode", &controllers.AppController{}, "get:Detail")

	// 工具
	beego.Router("/tools/qrcode", &controllers.ToolsController{}, "get:QRCode")

}
