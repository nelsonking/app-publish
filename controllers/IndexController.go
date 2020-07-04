package controllers

type IndexController struct {
	BaseController
}

func (c *IndexController) Index() {
	c.loadTmpl()
}
