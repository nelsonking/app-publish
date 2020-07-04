package utils

import (
	"fmt"
	"regexp"
	"time"
)

// 获取当前时间
func Timestamp() string {
	return time.Unix(time.Now().Unix(), 0).Format("2006-01-02 15:04:05")
}

// 格式化时间输出
func FormatTimeStamp(timestamp string, format string) string {
	//使用parseInLocation将字符串格式化返回本地时区时间
	stamp, _ := time.ParseInLocation(FormatTimeString("Y-m-d H:i:s"), timestamp, time.Local)

	fmt.Println(FormatTimeString("Y-m-d H:i:s"))
	format = FormatTimeString(format)

	return time.Unix(stamp.Unix(), 0).Format(format)
}

// 格式化时间格式
func FormatTimeString(format string) (formatString string) {
	regex := regexp.MustCompile(`(\w+)(\W?)`)
	result := regex.FindAllStringSubmatch(format, -1)
	var connectorStr string

	for _, timeUnit := range result {
		if len(timeUnit) == 0 {
			continue
		}

		if len(timeUnit) == 3 {
			connectorStr = timeUnit[2]
		} else {
			connectorStr = ""
		}

		switch timeUnit[1] {
		case "Y":
			formatString += "2006" + connectorStr
		case "m":
			formatString += "01" + connectorStr
		case "d":
			formatString += "02" + connectorStr
		case "H":
			formatString += "15" + connectorStr
		case "i":
			formatString += "04" + connectorStr
		case "s":
			formatString += "05"
		}
	}

	return formatString
}
