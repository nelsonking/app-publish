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
	beego.Router("/apps", &controllers.AppController{}, "get:Apps")
	beego.Router("/app/install/:id", &controllers.AppController{}, "get:Install")
	beego.Router("/app/:id", &controllers.AppController{}, "get:Detail")

	// 工具
	beego.Router("/tools/qrcode", &controllers.ToolsController{}, "get:QRCode")

}
