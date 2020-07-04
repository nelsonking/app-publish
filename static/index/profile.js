function remote_up_icon() {
    $(".progress-container").hide();
    $(".redirect-tips").show().text("正在上传到云存储...");
    var _url = in_path + "source/plugin/" + remote["dir"] + "/upload_progress.php?ac=icon&id=" + in_id + "&uid=" + in_uid + "&upw=" + in_upw;
    if (remote["version"] >= 0) {
        $("body").append('<iframe width="0" height="0" allowtransparency="true" scrolling="no" border="0" frameborder="0" src="' + _url + '"></iframe>');
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", _url.replace(/_progress/, ""), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    $(".redirect-tips").text("应用不存在或已被删除！");
                } else if (xhr.responseText == -2) {
                    $(".redirect-tips").text("您不能更新别人的应用！");
                } else if (xhr.responseText == 1) {
                    location.reload();
                }
            }
        }
    };
    xhr.send(null);
}

function remote_up_app() {
    $(".redirect-tips").text("正在上传到云存储...");
    var _url = in_path + "source/plugin/" + remote["dir"] + "/upload_progress.php?ac=app&time=" + in_time + "&uid=" + in_uid + "&upw=" + in_upw;
    if (remote["version"] >= 0) {
        $("body").append('<iframe width="0" height="0" allowtransparency="true" scrolling="no" border="0" frameborder="0" src="' + _url + '"></iframe>');
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", _url.replace(/_progress/, ""), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    $(".redirect-tips").text("应用不存在或已被删除！");
                } else if (xhr.responseText == -2) {
                    $(".redirect-tips").text("您不能更新别人的应用！");
                } else if (xhr.responseText == 1) {
                    location.reload();
                }
            }
        }
    };
    xhr.send(null);
}

function each_confirm() {
    $.layer({
        shade:  [0],
        area:   [
            "auto",
            "auto"
        ],
        dialog: {
            msg:  "确定要解除合并吗？",
            btns: 2,
            type: 4,
            btn:  [
                "确定",
                "取消"
            ],
            yes:  function () {
                each_del();
            },
            no:   function () {
                layer.msg("已取消解除", 1, 0);
            }
        }
    });
}

function each_del() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", in_path + "source/index/ajax_profile.php?ac=each_del&aid=" + in_id, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    layer.msg("请先登录后再操作！", 3, 11);
                } else if (xhr.responseText == -2) {
                    layer.msg("您不能解除别人的应用！", 3, 8);
                } else {
                    location.reload();
                }
            } else {
                layer.msg("通讯异常，请检查网络设置！", 3, 3);
            }
        }
    };
    xhr.send(null);
}

function each_add(_kid) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", in_path + "source/index/ajax_profile.php?ac=each_add&aid=" + in_id + "&kid=" + _kid, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    layer.msg("请先登录后再操作！", 3, 11);
                } else if (xhr.responseText == -2) {
                    layer.msg("应用不存在或已被删除！", 3, 11);
                } else if (xhr.responseText == -3) {
                    layer.msg("您不能合并别人的应用！", 3, 8);
                } else if (xhr.responseText == -4) {
                    layer.msg("应用平台一致，不能合并！", 3, 8);
                } else {
                    location.reload();
                }
            } else {
                layer.msg("通讯异常，请检查网络设置！", 3, 3);
            }
        }
    };
    xhr.send(null);
}

function s_earch() {
    var _keyword = $("#k_eyword").val().replace(/\//g, "");
    _keyword = _keyword.replace(/\\/g, "");
    _keyword = _keyword.replace(/\?/g, "");
    if (_keyword == "") {
        layer.msg("请输入要查询的关键词！", 1, 0);
        $("#k_eyword").focus();
    } else {
        location.href = in_path + "index.php/home/" + _keyword;
    }
}

function edit_app() {
    var xhr = new XMLHttpRequest();
    if ($("#in_name").val() == "") {
        layer.msg("应用名称不能为空！", 1, 0);
        $("#in_name").focus();
        return;
    }
    xhr.open("GET", in_path + "source/index/ajax_profile.php?ac=edit&name=" + escape($("#in_name").val()) + "&link=" + $("#in_link").val() + "&id=" + in_id, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    layer.msg("请先登录后再操作！", 3, 11);
                } else if (xhr.responseText == -2) {
                    layer.msg("应用不存在或已被删除！", 3, 11);
                } else if (xhr.responseText == -3) {
                    layer.msg("您不能编辑别人的应用！", 3, 8);
                } else if (xhr.responseText == -4) {
                    layer.msg("短链地址不规范！", 3, 8);
                } else if (xhr.responseText == -5) {
                    layer.msg("短链地址已被占用！", 3, 8);
                } else if (xhr.responseText == -6) {
                    layer.msg("短链功能未开放！", 3, 8);
                } else if (xhr.responseText == 1) {
                    layer.msg("恭喜，应用信息已保存！", 3, 1);
                    setTimeout("location.reload()", 1e3);
                } else {
                    layer.msg("内部出现错误，请稍后再试！", 3, 8);
                }
            } else {
                layer.msg("通讯异常，请检查网络设置！", 3, 3);
            }
        }
    };
    xhr.send(null);
}

function del_app(_id, _type) {
    if (_type > 0) {
        $.layer({
            shade:  [0],
            area:   [
                "auto",
                "auto"
            ],
            dialog: {
                msg:  "删除操作不可逆，确认继续？",
                btns: 2,
                type: 4,
                btn:  [
                    "确认",
                    "取消"
                ],
                yes:  function () {
                    del_app(_id, 0);
                },
                no:   function () {
                    layer.msg("已取消删除", 1, 0);
                }
            }
        });
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", in_path + "source/index/ajax_profile.php?ac=del&id=" + _id, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText == -1) {
                        layer.msg("请先登录后再操作！", 3, 11);
                    } else if (xhr.responseText == -2) {
                        layer.msg("应用不存在或已被删除！", 3, 11);
                    } else if (xhr.responseText == -3) {
                        layer.msg("您不能删除别人的应用！", 3, 8);
                    } else if (xhr.responseText == 1) {
                        layer.msg("恭喜，应用删除成功！", 3, 1);
                        setTimeout("location.href='" + home_link + "'", 1e3);
                    } else {
                        layer.msg("内部出现错误，请稍后再试！", 3, 8);
                    }
                } else {
                    layer.msg("通讯异常，请检查网络设置！", 3, 3);
                }
            }
        };
        xhr.send(null);
    }
}

function remove_ad(_id, _type) {
    if (_type > 0) {
        $.layer({
            shade:  [0],
            area:   [
                "auto",
                "auto"
            ],
            dialog: {
                msg:  "去除需扣除 " + in_adpoints + " 下载点数？",
                btns: 2,
                type: 4,
                btn:  [
                    "确认",
                    "取消"
                ],
                yes:  function () {
                    remove_ad(_id, 0);
                },
                no:   function () {
                    layer.msg("已取消去除", 1, 0);
                }
            }
        });
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", in_path + "source/index/ajax_profile.php?ac=remove_ad&id=" + _id, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText == -1) {
                        layer.msg("请先登录后再操作！", 3, 11);
                    } else if (xhr.responseText == -2) {
                        layer.msg("应用不存在或已被删除！", 3, 11);
                    } else if (xhr.responseText == -3) {
                        layer.msg("您不能去除别人的应用！", 3, 8);
                    } else if (xhr.responseText == -4) {
                        layer.msg("下载点数不足！", 3, 8);
                    } else if (xhr.responseText == 1) {
                        layer.msg("恭喜，广告去除成功！", 3, 1);
                        setTimeout("location.reload()", 1e3);
                    } else {
                        layer.msg("内部出现错误，请稍后再试！", 3, 8);
                    }
                } else {
                    layer.msg("通讯异常，请检查网络设置！", 3, 3);
                }
            }
        };
        xhr.send(null);
    }
}

function profile_info() {
    var xhr = new XMLHttpRequest();
    var mobile = document.getElementById("in_mobile");
    var qq = document.getElementById("in_qq");
    var firm = document.getElementById("in_firm");
    var job = document.getElementById("in_job");
    document.getElementById("user_tips").style.display = "block";
    if (mobile.value == "") {
        document.getElementById("user_tips").innerHTML = "手机不能为空，请填写！";
        mobile.focus();
        return;
    }
    if (qq.value == "") {
        document.getElementById("user_tips").innerHTML = "QQ不能为空，请填写！";
        qq.focus();
        return;
    }
    if (firm.value == "") {
        document.getElementById("user_tips").innerHTML = "公司不能为空，请填写！";
        firm.focus();
        return;
    }
    if (job.value == "") {
        document.getElementById("user_tips").innerHTML = "职位不能为空，请填写！";
        job.focus();
        return;
    }
    xhr.open("GET", in_path + "source/index/ajax_profile.php?ac=info&mobile=" + mobile.value + "&qq=" + qq.value + "&firm=" + escape(firm.value) + "&job=" + escape(job.value), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    document.getElementById("user_tips").innerHTML = "请先登录后再操作！";
                } else if (xhr.responseText == 1) {
                    document.getElementById("user_tips").innerHTML = "恭喜，个人资料已更新！";
                    setTimeout("location.reload()", 1e3);
                } else {
                    document.getElementById("user_tips").innerHTML = "内部出现错误，请稍后再试！";
                }
            } else {
                document.getElementById("user_tips").innerHTML = "通讯异常，请检查网络设置！";
            }
        }
    };
    xhr.send(null);
}

function profile_pwd() {
    var xhr = new XMLHttpRequest();
    var old_pwd = document.getElementById("old_pwd");
    var new_pwd = document.getElementById("new_pwd");
    var rnew_pwd = document.getElementById("rnew_pwd");
    document.getElementById("user_tips").style.display = "block";
    if (old_pwd.value == "") {
        document.getElementById("user_tips").innerHTML = "<li>当前密码不能为空！</li>";
        old_pwd.focus();
        return;
    }
    if (new_pwd.value.length < 6) {
        document.getElementById("user_tips").innerHTML = "<li>新密码最小长度为 6 个字符。</li>";
        new_pwd.focus();
        return;
    }
    if (rnew_pwd.value !== new_pwd.value) {
        document.getElementById("user_tips").innerHTML = "<li>两次输入的密码不一致！</li>";
        rnew_pwd.focus();
        return;
    }
    xhr.open("GET", in_path + "source/index/ajax_profile.php?ac=pwd&old=" + old_pwd.value + "&new=" + rnew_pwd.value, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == -1) {
                    document.getElementById("user_tips").innerHTML = "<li>请先登录后再操作！</li>";
                } else if (xhr.responseText == -2) {
                    document.getElementById("user_tips").innerHTML = "<li>当前密码有误，请重试！</li>";
                } else if (xhr.responseText == 1) {
                    document.getElementById("user_tips").innerHTML = "<li>恭喜，密码修改成功！</li>";
                    setTimeout("location.reload()", 1e3);
                } else {
                    document.getElementById("user_tips").innerHTML = "<li>内部出现错误，请稍后再试！</li>";
                }
            } else {
                document.getElementById("user_tips").innerHTML = "<li>通讯异常，请检查网络设置！</li>";
            }
        }
    };
    xhr.send(null);
}

function ReturnValue(response) {
    $(".progress-container").hide();
    $(".redirect-tips").show();

    if (response.code !== 200) {
        $(".redirect-tips").text(response.message);
    } else {
        $(".redirect-tips").text("安装包解析成功");

        setTimeout(function () {
            location.href = "/apps";
        }, 1000)
    }
}