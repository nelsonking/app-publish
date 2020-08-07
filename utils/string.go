package utils

import (
	"crypto/md5"
	"encoding/hex"
	"strings"
)

// 按字符串拆分返回最后一个
func SplitGetLast(str string, split string) (string, bool) {
	arr := strings.Split(str, split)
	if len(arr) == 0 {
		return "", false
	}

	last := arr[len(arr) -1]
	return last, true
}


// 按字符串拆分返回第一个
func SplitGetFirst(str string, split string) (string, bool) {
	arr := strings.Split(str, split)
	if len(arr) == 0 {
		return "", false
	}

	last := arr[0]
	return last, true
}

// 单词指定规则线命名
func WordToCharLine(word string, char string) string {
	finalStr := ""
	for i:=0; i< len(word);i++ {
		originStr := string(word[i])
		lowerStr := strings.ToLower(originStr)

		// 首个字母和小写字母直接追加
		if originStr == lowerStr || i == 0{
			finalStr += lowerStr
		} else {
			finalStr += "-" +lowerStr
		}
	}

	return finalStr
}

//返回一个32位md5加密后的字符串
func GetMD5Encode(data string) string {
	h := md5.New()
	h.Write([]byte(data))

	return hex.EncodeToString(h.Sum(nil))
}

//返回一个16位md5加密后的字符串
func Get16MD5Encode(data string) string{

	return GetMD5Encode(data)[8:24]
}
