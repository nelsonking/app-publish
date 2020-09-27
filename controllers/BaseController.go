package controllers

import (
	"app-publish/utils"
	"github.com/astaxie/beego"
	"net/http"
	"runtime"
	"strings"
	"time"
)

type BaseController struct {
	beego.Controller
}

type Empty struct {}

type JsonStruct struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (c *BaseController) JsonSuccess(data interface{}, message string) {
	c.Data["json"] = &JsonStruct{200, message, data}
	c.ServeJSON()
}

func (c *BaseController) JsonError(message string, code int) {
	c.Data["json"] = &JsonStruct{code, message, struct {}{}}
	c.ServeJSON()
}


func (c *BaseController) renderData(key string, value interface{}) {
	c.Data[key] = value
}


// 只能通过子菜单调用该方法获取类名
func (c *BaseController) loadTmpl() {
	pc, filePath, _, ok := runtime.Caller(1)

	if !ok {
		c.JsonError("请检测程序加载有效性", http.StatusInternalServerError)
	}

	method := runtime.FuncForPC(pc)

	controllerName := c.getControllerNameByFilePath(filePath)
	methodName := c.getMethodNameByRuntimeMethod(method.Name())

	c.autoRenderTplData()
	c.TplName = controllerName + "/" + methodName + ".tpl"
}

// 获取当前协议对应的 host
func (c *BaseController) getCurrentHost() string {
	protocol := "http://"

	if c.isHttpsRequest() {
		protocol = "https://"
	}

	return utils.GetCurrentHost(protocol)
}

// 是否是 https 请求
func (c *BaseController) isHttpsRequest() bool {
	refer := c.Ctx.Request.Header.Get("Referer")
	if strings.HasPrefix(refer, "https://") {
		return true
	}

	return false
}

// 自动渲染模板基础数据
func (c *BaseController) autoRenderTplData() {
	userAgent := c.Ctx.Request.Header.Get("User-Agent")

	c.renderData("day", time.Unix(time.Now().Unix(), 0).Format("060102"))
	c.renderData("userAgent", userAgent)
	c.renderData("weChat", strings.Contains(userAgent, "MicroMessenger"))
	c.renderData("Year", time.Now().Year())
	c.renderData("Host", c.Ctx.Input.Domain())
	c.renderData("Email", "gaoyansing@sina.com")
	c.renderData("Icp", "备案中...")
}

// 获取控制器名称
func (c *BaseController) getControllerNameByFilePath(filePath string) string {
	controllerTag := "Controller.go"

	controllerName, ok := utils.SplitGetLast(filePath, "/")
	if !ok {
		c.JsonError("文件错乱，请检测", http.StatusInternalServerError)
	}

	controllerName = strings.Replace(controllerName, controllerTag, "", len(controllerTag))
	return utils.WordToCharLine(controllerName, "-")
}

// 获取当前方法名称
func (c *BaseController) getMethodNameByRuntimeMethod(runtimeMethod string) string {
	methodName, ok := utils.SplitGetLast(runtimeMethod, ".")
	if !ok {
		c.JsonError("文件错乱，请检测", http.StatusInternalServerError)
	}

	return utils.WordToCharLine(methodName, "-")
}
