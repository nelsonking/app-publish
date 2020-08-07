package models

import (
	"fmt"
	"github.com/astaxie/beego/orm"
	"strconv"
)

type Apps struct {
	Id            int64  `orm:"pk;auto;unique;column(id)" json:"id"`
	AppCode       string `orm:"size(128)"`
	Name          string `orm:"size(128)"`
	BundleId      string `orm:"size(128)"`
	BundleVersion string `orm:"size(128)"`
	Type          int
	Icon          string `orm:"size(128)"`
	Plist         string `orm:"size(128)"`
	Size          int64
	Version       string `orm:"size(128)"`
	VersionCode   string `orm:"size(128)"`
	CreatedAt     string `orm:"size(128)"`
	UpdatedAt     string `orm:"size(128)"`
}

type MaxBundle struct {
	Id            int64  `orm:"pk;auto;unique;column(id)" json:"id"`
	BundleId      string `orm:"size(128)"`
}

func init() {
	orm.RegisterModel(new(Apps))
}

func NewApps() *Apps {
	return &Apps{}
}

// 添加应用
func (app *Apps) AddApp(appData *Apps) (id int64, error error) {
	o := orm.NewOrm()
	id, error = o.Insert(appData)

	return
}

// 应用列表
func (app *Apps) ListApps(currentPage int, pageSize int) (appList []*Apps, totalCount int64, err error) {
	o := orm.NewOrm()

	query := o.QueryTable(new(Apps))
	offset := (currentPage - 1) * pageSize

	_, err = query.OrderBy("-id").Offset(offset).Limit(pageSize).All(&appList)

	totalCount, err = query.Count()

	return
}

// 获取最新的APP ID
func (app *Apps) MaxDifferentAppId() (maxBundleList []*MaxBundle, err error) {
	o := orm.NewOrm()

	minBundleIdSql := "select max(id) as id,bundle_id from apps GROUP BY bundle_id"
	_,err = o.Raw(minBundleIdSql).QueryRows(&maxBundleList)

	return
}

// 获取最新的APP 列表
func (app *Apps) GetMaxAppsByAppByMaxBundleList(maxBundleList []*MaxBundle, currentPage int, pageSize int) (appList []*Apps, totalCount int64, err error) {
	offset := (currentPage - 1) * pageSize

	idStr := ""
	for _,maxBundle := range maxBundleList {
		totalCount += 1

		if idStr == "" {
			idStr += strconv.Itoa(int(maxBundle.Id))
		} else {
			idStr += "," + strconv.Itoa(int(maxBundle.Id))
		}
	}

	o := orm.NewOrm()
	maxBundleIdSql := fmt.Sprintf("select * from apps where id in (%s) limit %d offset %d ", idStr, pageSize, offset)

	_,err = o.Raw(maxBundleIdSql).QueryRows(&appList)

	return
}

// 通过ID 获取应用
func (app *Apps) Find(id int, cols ...string) (*Apps, error) {
	o := orm.NewOrm()

	if err := o.QueryTable(new(Apps)).Filter("id", id).One(app, cols...); err != nil {
		return app, err
	}

	return app, nil
}

// 通过 AppCode 获取最新应用
func (app *Apps) FindRecentByAppCode(appCode string, cols ...string) (*Apps, error) {
	o := orm.NewOrm()

	if err := o.QueryTable(new(Apps)).Filter("app_code", appCode).OrderBy("-id").One(app, cols...); err != nil {
		fmt.Println(err)

		return app, err
	}

	return app, nil
}


// 通过AppCode 查询包下所有应用 去掉最新的一个
func (app *Apps) FindAppListByAppCode(appCode string) (listApp []*Apps, error error) {
	o := orm.NewOrm()

	_, error = o.QueryTable(new(Apps)).Filter("app_code", appCode).OrderBy("-id").All(&listApp)

	return
}

