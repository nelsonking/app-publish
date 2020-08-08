package controllers

import (
	"app-publish/models"
	"app-publish/utils"
	"bufio"
	"crypto/md5"
	"fmt"
	"image/jpeg"
	"io"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

type AppController struct {
	BaseController
}

// APP 安装详情
func (c *AppController) Detail() {
	var appObj *models.Apps
	var qrCodeStr string

	appId, _ := strconv.Atoi(c.GetString("id", "0"))
	appCode := c.Ctx.Input.Param(":appCode")
	qrCodeStr = "app/" + appCode

	if appId != 0 {
		appObj, _ = models.NewApps().Find(appId)
		qrCodeStr += fmt.Sprintf("?id=%d", appId)
	} else {
		appObj, _ = models.NewApps().FindRecentByAppCode(appCode)
	}

	c.renderData("appObj", appObj)
	c.renderData("qrCodeStr", qrCodeStr)
	c.renderData("currentLink", utils.GetHttpsUrl()+c.Ctx.Request.RequestURI)

	c.loadTmpl()
}

// APP 管理
func (c *AppController) Manage() {
	appCode := c.Ctx.Input.Param(":appCode")
	appObj, _ := models.NewApps().FindRecentByAppCode(appCode)

	c.renderData("appObj", appObj)
	c.renderData("currentLink", utils.GetHttpsUrl()+c.Ctx.Request.RequestURI)

	c.loadTmpl()
}

// APP 版本列表
func (c *AppController) List() {
	appCode := c.Ctx.Input.Param(":appCode")
	appObjList, _ := models.NewApps().FindAppListByAppCode(appCode)

	c.JsonSuccess(appObjList, "success")
}


// APP 列表
func (c *AppController) Apps() {
	pageSize := 5
	currentPage, _ := c.GetInt("page", 1)

	minBundleList, err := models.NewApps().MaxDifferentAppId()
	if err != nil {
		c.JsonError(err.Error(), 500)
	}
	listApps, total, _ := models.NewApps().GetMaxAppsByAppByMaxBundleList(minBundleList, currentPage, pageSize)

	//listApps, total, _ := models.NewApps().ListApps(currentPage, pageSize)
	if total > 0 {
		paper := utils.NewPagination(c.Ctx.Request, int(total), pageSize, "")
		c.renderData("paper", paper.HtmlPages())
	} else {
		c.renderData("paper", "")
	}

	c.renderData("host", utils.GetHttpUrl())
	c.renderData("listApps", listApps)
	c.renderData("total", total)

	c.loadTmpl()
}

// APP 上传
func (c *AppController) Upload() {
	appFilePath := c.storeFile()
	appInfo := c.parse(appFilePath)
	iconPath := c.storeAppIcon(appInfo)

	// 苹果保存上传文件为 Plist
	if appInfo.Type == utils.IosType {
		appFilePath = c.storeIpaPlist(appInfo, appFilePath, iconPath)
	}

	app := models.Apps{
		Name:          appInfo.Name,
		AppCode:       appInfo.AppCode,
		BundleId:      appInfo.BundleId,
		BundleVersion: appInfo.Version,
		VersionCode:   appInfo.Build,
		Type:          appInfo.Type,
		Icon:          iconPath,
		Plist:         appFilePath,
		Size:          appInfo.Size,
		CreatedAt:     utils.Timestamp(),
		UpdatedAt:     utils.Timestamp(),
	}

	appId, err := models.NewApps().AddApp(&app)

	if err != nil {
		c.JsonError(err.Error(), 500)
	}

	c.JsonSuccess(map[string]interface{}{
		"id":        appId,
		"extension": appInfo.Extension,
		"size":      appInfo.Size,
		"time":      time.Now().Unix(),
	}, "")
}

// 下载安装应用
func (c *AppController) Install() {
	c.Prepare()
	appId, _ := strconv.Atoi(c.Ctx.Input.Param(":id"))
	appObj, err := models.NewApps().Find(appId)
	if err != nil {
		c.JsonError("应用不存在", 500)
	}

	appUrl := c.getCurrentHost() + "/" + appObj.Plist

	if appObj.Type == utils.IosType {
		if !c.isHttpsRequest() {
			c.JsonError("当前请求非 HTTPS 无法执行安装", 500)
		}

		c.Ctx.Redirect(302, "itms-services://?action=download-manifest&url="+appUrl)
	}

	c.Ctx.Output.Header("location", appUrl)
	c.Ctx.Redirect(302, appUrl)
}

// 获取上传目录
func (c *AppController) getStorePath() string {
	//创建目录
	uploadDir := "storage/upload/" + time.Now().Format("2006/01/")

	_, err := os.Stat(uploadDir)
	if err != nil {
		err = os.MkdirAll(uploadDir, os.ModePerm)

		if err != nil {
			c.JsonError(err.Error(), 500)
		}
	}

	return uploadDir
}

// 获取上传文件名 自定义后缀
func (c *AppController) getStoreName(ext string) string {
	rand.Seed(time.Now().UnixNano())
	randNum := fmt.Sprintf("%d", rand.Intn(9999)+1000)
	hashName := md5.Sum([]byte(time.Now().Format("2006_01_02_15_04_") + randNum))
	fileName := fmt.Sprintf("%x", hashName) + "." + ext

	return fileName
}

// 保存上传的APP文件
func (c *AppController) storeFile() string {
	appFieldName := "app"

	appFile, appFilePointer, err := c.GetFile(appFieldName)
	if err != nil {
		c.JsonError("上传文件不存在", 500)
	}
	defer appFile.Close()

	extFile, _ := utils.SplitGetLast(appFilePointer.Filename, ".")

	var allowExpMap map[string]bool = map[string]bool{
		"apk": true,
		"APK": true,
		"ipa": true,
		"IPA": true,
	}

	if _, err := allowExpMap[extFile]; !err {
		c.JsonError("文件符合上传要求", 500)
	}

	filePath := c.getStorePath() + c.getStoreName(extFile)
	err = c.SaveToFile(appFieldName, filePath)

	if err != nil {
		c.JsonError(err.Error(), 500)
	}

	return filePath
}

// 保存应用图标
func (c *AppController) storeAppIcon(appInfo *utils.AppInfo) (imagePath string) {
	imagePath = c.getStorePath() + c.getStoreName("png")
	imageFile, _ := os.Create(imagePath)
	err := jpeg.Encode(imageFile, appInfo.Icon, nil)

	if err != nil {
		c.JsonError("APP 图标保存失败", 500)
	}

	return
}

// 保存 ipa plist 文件
func (c *AppController) storeIpaPlist(appInfo *utils.AppInfo, appFilePath string, iconPath string) (plistPath string) {
	fmt.Println("store ipa plist")
	plistPath = c.getStorePath() + c.getStoreName("plist")
	plistFile, _ := os.Create(plistPath)
	defer plistFile.Close()

	host := utils.GetHttpsUrl() + "/"
	originPlistFile := "static/app/down.plist"
	originPlistFileHandler, err := os.Open(originPlistFile)

	if err != nil {
		c.JsonError("plist 文件读取失败", 500)
	}

	originPlistFileHandlerReader := bufio.NewReader(originPlistFileHandler)

	for {
		line, _, err := originPlistFileHandlerReader.ReadLine()
		if err == io.EOF {
			break
		}

		if err != nil {
			c.JsonError("plist 文件读取失败", 500)
		}

		newLine := strings.Replace(string(line), "{ipa}", host+appFilePath, -1)
		newLine = strings.Replace(newLine, "{icon}", host+iconPath, -1)
		newLine = strings.Replace(newLine, "{bid}", appInfo.BundleId, -1)
		newLine = strings.Replace(newLine, "{name}", appInfo.Name, -1)

		_, err = plistFile.WriteString(newLine + "\n")

		if err != nil {
			c.JsonError("plist 文件写入失败", 500)
		}
	}

	return
}

// 文件解析
func (c *AppController) parse(file string) *utils.AppInfo {
	appInfo, err := utils.NewAppParser(file)

	if err != nil {
		c.JsonError(err.Error(), 500)
	}

	return appInfo
}
