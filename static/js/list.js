/**
 * 获取包列表
 */
function getPackageList() {
    var appCode = $("#appCode").val();
    var url = "/app/list/" + appCode;

    $.post(url, function (result) {
        if (result.code == 200) {
            var packages = result.data;

            var packageList = '';
            packageList += '<li>';
            packageList += '<span class="dot"></span>';
            packageList += '<span class="filter ng-binding">版本更新</span>';
            packageList += '<span class="filter version-rollback ng-scope"></span>';
            packageList += '</li>';
            packageList += '<li>';
            packageList += '<div class="market-app-info">';
            packageList += '</div>';
            packageList += '</li>';
            for (var i = 0; i < packages.length; i++) {
                var package = packages[i];
                var version = package.VersionCode;
                var buildVersion = package.BundleVersion;
                var displayTime = package.CreatedAt;
                var type = "内测版";
                var downloadURL = "/" + package.Plist;
                var displaySize =  (package.Size / 1024 / 1024).toFixed(2) + " MB";
                var previewURL = "/app/" + package.AppCode + "?id=" + package.id;
                var id = package.id;
                var message = "";

                packageList += '<li class="package_index_' + id + '">';
                packageList += '<div>';
                packageList += '<div class="directive-view-release">';
                packageList += '<i class="icon-upload-cloud2"></i>';
                packageList += '<b class="ng-binding">' + version + ' (Build ' + buildVersion + ')' + message + '</b > ';
                packageList += '<div class="release-metainfo ng-hide">';
                packageList += '<small><i class="icon-calendar"></i>';
                packageList += '<span class="ng-binding">' + displayTime + '</span>';
                packageList += '</small>';
                packageList += '</div>';
                packageList += '<div class="release-metainfo">';
                packageList += '<small><i class="icon-calendar"></i>';
                packageList += '<span class="ng-binding">' + displayTime + '</span></small> &nbsp;&nbsp;·&nbsp;&nbsp;';
                packageList += '<small class="ng-scope">' + type + '</small>';
                packageList += '<i class="ng-hide">&nbsp;&nbsp;·&nbsp;&nbsp;</i>';
                packageList += '<small class="ng-binding ng-hide"></small>';
                packageList += '</div>';
                packageList += '<div class="release-actions">';
                packageList += '<button class="tooltip-top download-action" tooltip="下载原文件" value="' + downloadURL + '">';
                packageList += '<i class="icon-cloud-download"></i>';
                packageList += '<span class="ng-binding"> ' + displaySize + '</span>';
                packageList += '</button>';
                packageList += '<button class="preview" value="' + previewURL + '">';
                packageList += '<i class="icon-eye"></i>';
                packageList += '<span class="ng-binding"> 预览</span>';
                packageList += '</button>';

                if (i > 0) {
                    packageList += '<button class="ng-scope app-delete" data="' + id + '">';
                    packageList += '<i class="icon-trash"></i>';
                    packageList += '<span class="ng-binding"> 删除</span>';
                    packageList += '</button>';
                }

                packageList += '</div>';
                packageList += '</div >';
                packageList += '</div >';
                packageList += '</li >';
            }

            packageList += '<li class="more" ng-show="currentApp.releases.current_page &lt; currentApp.releases.total_pages">';
            packageList += '<button ng-click="moreRelease()" class="ng-binding">显示更多版本</button></li>';

            $("#app-activity-panel").empty();
            $("#app-activity-panel").append(packageList);

            bindActions();
        }
    });
}

/**
 * 切换面板时样式清除
 */
function removeAllPanelClass() {
    $("#info-container").removeClass("app-info");
    $("#info-container").removeClass("app-integration");
    $("#info-container").removeClass("app-activities");
    $("#info-panel").removeClass("apps-app-integration")
    $("#info-panel").removeClass("apps-app-info");
    $("#info-panel").removeClass("apps-app-activities");
    $("#app-activity-panel").removeClass("ng-hide");
    $("#app-info-panel").removeClass("ng-hide");
    $("#app-integration-panel").removeClass("ng-hide");
}

/**
 * 绑定事件
 */
function bindActions() {
    $(".download-action").click(function () {
        window.open($(this).val())
    });

    $(".preview").click(function () {
        window.open($(this).val())
    });

    $(".app-delete").click(function () {
        var id = $(this).attr("data");
        var url = "/p/delete/" + id;
        var li = "package_index_" + id;
        console.log(li);
        var self = $("." + li);
        $.post(url, function (result) {
            var success = result.code == 0;
            if (success) {
                self.remove();
            }
            $.toast({text: result.msg, icon: success ? "success" : "error"});
        });
    });
}

$(function () {
    getPackageList();

    $("#js-app-short-copy-trigger").click(function () {
        new ClipboardJS('#js-app-short-copy-trigger', {
            text: function (trigger) {
                return trigger.getAttribute('value');
            }
        });
    });

    $("#app-activity-icon").click(function () {
        removeAllPanelClass();
        $("#info-container").addClass("app-activities");
        $("#info-panel").addClass("apps-app-activities");
        $("#app-info-panel").addClass("ng-hide");
        $("#app-integration-panel").addClass("ng-hide");
    });
    $("#app-info-icon").click(function () {
        removeAllPanelClass();
        $("#info-container").addClass("app-info");
        $("#info-panel").addClass("apps-app-info");
        $("#app-activity-panel").addClass("ng-hide");
        $("#app-integration-panel").addClass("ng-hide");
    });
    $("#app-integration-icon").click(function () {
        removeAllPanelClass();
        $("#info-container").addClass("app-integration");
        $("#info-panel").addClass("apps-app-integration");
        $("#app-activity-panel").addClass("ng-hide");
        $("#app-info-panel").addClass("ng-hide");
    });

    $("#delete-app").click(function () {
        var url = "/app/delete/" + $(this).attr("data");
        $.post(url, function (result) {
            window.location.href = "/apps"
        });
    });

    $("#ding-ding-web-hook-name, #ding-ding-web-hook-url").bind("input propertychange", function (event) {
        var name = $("#ding-ding-web-hook-name").val();
        var url = $("#ding-ding-web-hook-url").val();
        if (name.length > 0 && url.length > 0) {
            $("#webHookAdd").removeAttr("disabled");
            $("#webHookUpdate").removeAttr("disabled");
        }
    });
});