package controllers

type TestController struct {
	BaseController
}

// 窗口测试
func (c *TestController) Test()  {
	c.JsonSuccess("","")
}
