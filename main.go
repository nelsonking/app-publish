package main

import (
	"app-publish/bootstrap"
	_ "app-publish/routers"
	"github.com/astaxie/beego"
)

func main() {
	bootstrap.AutoRegister()

	beego.Run()
}

