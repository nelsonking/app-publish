package controllers

import (
	"github.com/skip2/go-qrcode"
)

type ToolsController struct {
	BaseController
}

// 按当前网站生成二维码
func (c *ToolsController) QRCode()  {
	url := c.GetString("url")
	url = c.getCurrentHost() + "/" + url
	qrCodeContent, _ := qrcode.Encode(url, qrcode.Medium,256)

	c.Ctx.WriteString(string(qrCodeContent))
}
