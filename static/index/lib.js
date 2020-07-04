function buy(_tid) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", in_path + "source/pack/weixin/buy.php?tid=" + _tid, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    layer.msg("请先登录后再操作！");
                } else {
                    $(".dialog-mask").show();
                    $(".buy-confirm").show();
                    $("#qrcode").attr("src", in_path + "source/pack/weixin/qrcode.php?link=" + encodeURIComponent(xhr.responseText));
                }
            } else {
                layer.msg("通讯异常，请检查网络设置！");
            }
        }
    };
    xhr.send(null);
}

function pay(_rmb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", in_path + "source/pack/weixin/pay.php?rmb=" + _rmb, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    layer.msg("请先登录后再操作！");
                } else {
                    $(".dialog-mask").show();
                    $(".buy-confirm").show();
                    $("#qrcode").attr("src", in_path + "source/pack/weixin/qrcode.php?link=" + encodeURIComponent(xhr.responseText));
                }
            } else {
                layer.msg("通讯异常，请检查网络设置！");
            }
        }
    };
    xhr.send(null);
}

function login() {
    var xhr = new XMLHttpRequest();
    var mail = document.getElementById("mail");
    var pwd = document.getElementById("pwd");
    document.getElementById("alert-warning").style.display = "block";
    if (strLen(mail.value) < 1 || isEmail(mail.value) == false) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱格式有误，请更改！</li></ul>";
        mail.focus();
        return;
    }
    if (strLen(pwd.value) < 1) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>密码不能为空，请填写！</li></ul>";
        pwd.focus();
        return;
    }
    xhr.open("GET", in_path + "source/index/ajax.php?ac=login&mail=" + mail.value + "&pwd=" + pwd.value, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "return_1") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱已被锁定，请联系管理员！</li></ul>";
                } else if (xhr.responseText == "return_2") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>登录信息不匹配，请重试！</li></ul>";
                } else if (xhr.responseText == "return_3") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>登录成功，请稍等...</li></ul>";
                    setTimeout("location.href='" + home_link + "'", 1e3);
                } else {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>内部出现错误，请稍后再试！</li></ul>";
                }
            } else {
                document.getElementById("alert-warning").innerHTML = "<ul><li>通讯异常，请检查网络设置！</li></ul>";
            }
        }
    };
    xhr.send(null);
}

function reg() {
    var xhr = new XMLHttpRequest();
    var mail = document.getElementById("mail");
    var pwd = document.getElementById("pwd");
    var rpwd = document.getElementById("rpwd");
    var seccode = document.getElementById("seccode");
    document.getElementById("alert-warning").style.display = "block";
    if (strLen(mail.value) < 1 || isEmail(mail.value) == false) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱格式有误，请更改！</li></ul>";
        mail.focus();
        return;
    }
    if (strLen(pwd.value) < 6) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>密码最小长度为 6 个字符。</li></ul>";
        pwd.focus();
        return;
    }
    if (rpwd.value !== pwd.value) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>两次输入的密码不一致！</li></ul>";
        rpwd.focus();
        return;
    }
    if (strLen(seccode.value) != 4) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>请输入四位验证码！</li></ul>";
        seccode.focus();
        return;
    }
    xhr.open("GET", in_path + "source/index/ajax.php?ac=reg&mail=" + mail.value + "&pwd=" + rpwd.value + "&seccode=" + seccode.value, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "return_1") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>验证码有误，请更改！</li></ul>";
                } else if (xhr.responseText == "return_2") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱已被占用，请更改！</li></ul>";
                } else if (xhr.responseText == "return_3") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>注册成功，请稍等...</li></ul>";
                    setTimeout("location.href='" + home_link + "'", 1e3);
                } else {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>内部出现错误，请稍后再试！</li></ul>";
                }
            } else {
                document.getElementById("alert-warning").innerHTML = "<ul><li>通讯异常，请检查网络设置！</li></ul>";
            }
        }
    };
    xhr.send(null);
}

function send_mail() {
    var xhr = new XMLHttpRequest();
    var mail = document.getElementById("mail");
    document.getElementById("alert-warning").style.display = "block";
    if (strLen(mail.value) < 1 || isEmail(mail.value) == false) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱格式有误，请更改！</li></ul>";
        mail.focus();
        return;
    }
    document.getElementById("send_btn").innerHTML = "获取中...";
    xhr.open("GET", in_path + "source/index/ajax.php?ac=send&mail=" + mail.value, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "return_0") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>邮件服务暂未开启，请联系管理员！</li></ul>";
                } else if (xhr.responseText == "return_1") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱不存在，请更改！</li></ul>";
                } else if (xhr.responseText == "return_2") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>请等待 30 秒后再重新获取！</li></ul>";
                } else if (xhr.responseText == "return_4") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>邮件码已发送至邮箱，请注意查收！</li></ul>";
                } else {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>抱歉，邮件码未能发送成功！</li></ul>";
                }
            } else {
                document.getElementById("alert-warning").innerHTML = "<ul><li>通讯异常，请检查网络设置！</li></ul>";
            }
            document.getElementById("send_btn").innerHTML = "重新获取";
        }
    };
    xhr.send(null);
}

function lost() {
    var xhr = new XMLHttpRequest();
    var mail = document.getElementById("mail");
    var mcode = document.getElementById("mcode");
    var pwd = document.getElementById("pwd");
    var rpwd = document.getElementById("rpwd");
    document.getElementById("alert-warning").style.display = "block";
    if (strLen(mail.value) < 1 || isEmail(mail.value) == false) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱格式有误，请更改！</li></ul>";
        mail.focus();
        return;
    }
    if (strLen(mcode.value) < 1) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>邮件码不能为空！</li></ul>";
        mcode.focus();
        return;
    }
    if (strLen(pwd.value) < 6) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>密码最小长度为 6 个字符。</li></ul>";
        pwd.focus();
        return;
    }
    if (rpwd.value !== pwd.value) {
        document.getElementById("alert-warning").innerHTML = "<ul><li>两次输入的密码不一致！</li></ul>";
        rpwd.focus();
        return;
    }
    xhr.open("GET", in_path + "source/index/ajax.php?ac=lost&mail=" + mail.value + "&pwd=" + rpwd.value + "&mcode=" + mcode.value, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "return_1") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>邮箱不存在，请更改！</li></ul>";
                } else if (xhr.responseText == "return_2") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>邮件码有误，请更改！</li></ul>";
                } else if (xhr.responseText == "return_3") {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>重置成功，请稍等...</li></ul>";
                    setTimeout("location.href='" + login_link + "'", 1e3);
                } else {
                    document.getElementById("alert-warning").innerHTML = "<ul><li>内部出现错误，请稍后再试！</li></ul>";
                }
            } else {
                document.getElementById("alert-warning").innerHTML = "<ul><li>通讯异常，请检查网络设置！</li></ul>";
            }
        }
    };
    xhr.send(null);
}

function strLen(str) {
    var charset = document.charset;
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? charset == "gbk" ? 3 : 2 : 1;
    }
    return len;
}

function isEmail(input) {
    if (input.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        return true;
    }
    return false;
}
