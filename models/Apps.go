package models

import (
	"github.com/astaxie/beego/orm"
)

type Apps struct {
	Id            int64  `orm:"pk;auto;unique;column(id)" json:"id"`
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

func init() {
	orm.RegisterModel(new(Apps))
}

func NewApps() *Apps {
	return &Apps{}
}

func (app *Apps) AddApp(appData *Apps) (id int64, error error) {
	o := orm.NewOrm()
	id, error = o.Insert(appData)

	return
}

func (app *Apps) ListApps() (appList []*Apps, totalCount int64, err error) {
	o := orm.NewOrm()

	query := o.QueryTable(new (Apps))
	_, err = query.OrderBy("-id").All(&appList)
	totalCount, err = query.Count()

	return
}

func (app *Apps) Find(id int, cols ...string) (*Apps, error) {
	o := orm.NewOrm()

	if err := o.QueryTable(new (Apps)).Filter("id", id).One(app, cols ...); err != nil {
		return app, err
	}

	return app, nil
}
