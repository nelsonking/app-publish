package utils

import "github.com/astaxie/beego"

func GetHttpsUrl() string{
	return "https://" + beego.AppConfig.String("host")
}

func GetHttpUrl() string{
	return "http://" + beego.AppConfig.String("host")
}

func GetCurrentHost(protocol string) string {
	return protocol + beego.AppConfig.String("host")
}

func CheckMobile() {

}


