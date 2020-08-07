<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Stict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:th="http://www.thymeleaf.org">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="x-ua-compatible" content="IE=edge">
	<meta name="renderer" content="webkit">
	<title class="ng-binding">{{.appObj.Name}} - 应用动态</title>
	<link rel="stylesheet" href="/static/index/bootstrap.css">
	<link rel="stylesheet" href="/static/css/index.css">
	<link rel="stylesheet" href="/static/css/jquery.toast.css">
	<script type="text/javascript" src="/static/js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="/static/js/jquery.toast.js"></script>
	<script type="text/javascript" src="/static/js/clipboard.min.js"></script>
</head>

<body class="ng-scope">
<nav class="navbar navbar-transparent fade-out navbar-black">
	<div class="navbar-header">
		<a class="navbar-brand" href="/apps"><i class="icon-logo"></i></a>
	</div>
	<div class="collapse navbar-collapse navbar-ex1-collapse ng-scope">
		<div class="dropdown">
			<div>
			</div>
		</div>
	</div>
</nav>
<div class="menu-toggle fade-out">
	<i class="icon-menu"></i>
</div>
<div class="navbar-wrapper ng-scope">
	<div ng-controller="NavbarController" class="ng-scope">
		<div class="navbar-header-wrap">
			<div class="middle-wrapper">
				<nav>
					<h1 class="navbar-title logo">
						<i class="icon-logo"></i>
					</h1>
					<i class="icon-angle-right"></i>
					<div class="navbar-title primary-title">
						<a class="ng-binding" href="/apps">我的应用</a>
					</div>
					<i class="icon-angle-right"></i>
					<div class="navbar-title secondary-title ng-binding" style="">
                        {{.appObj.Name}}
					</div>
				</nav>
			</div>
		</div>
	</div>
</div>
<!-- ngInclude: '/templates_manage/upload_modal.html' -->
<section data-ui-view="" class="ng-scope" style="">
	<div id="info-container" class="page-app app-activities">
		<div class="banner has-devices">
			<div class="middle-wrapper clearfix">
				<div id="app-activity-icon" class="pull-left icon-container appicon">
					<img src="/{{.appObj.Icon}}" width="100" height="100" class="change_icon ng-isolate-scope" />
				</div>
				<div class="badges">
                    {{if eq .appObj.Type 1}}
						<span class="apptype ng-binding">Android</span>
					{{else}}
						<span class="apptype ng-binding">iOS</span>
                    {{end}}
					<span class="bundleid ng-binding">BundleID<b class="ng-binding">&nbsp;&nbsp;{{.appObj.BundleId}}</b></span>
				</div>

				<div class="actions">
					<a class="download ng-binding" href="/app/{{.appObj.AppCode}}" target="_blank">
						<i class="icon-eye"></i> 预览
					</a>
				</div>
				<div class="tabs-container">
					<ul class="list-inline">
						<li><a id="app-info-icon" class="ng-binding"><i class="icon-file"></i> 基本信息</a></li>
					</ul>
				</div>
			</div>
		</div>

		<!-- uiView:  -->
		<div data-ui-view="" class="ng-scope">
			<div id="info-panel" class="page-app-activities page-tabcontent apps-app-info ng-scope">
				<!-- ngIf: !activitiesReady -->
				<div class="middle-wrapper" ng-show="activitiesReady">
					<!--                      更新面板-->
					<ul id="app-activity-panel" class="list-unstyled time-line"></ul>
					<!--信息面板-->
					<div id="app-info-panel" class="app-info-form ng-pristine ng-valid ng-valid-required ng-valid-pattern ng-hide">
						<div class="field app-id">
							<div class="left-label ng-binding">
								应用 ID
							</div>
							<div class="value">
								<input class="ng-hide" value="{{.appObj.AppCode}}" name="appCode" id="appCode"/>
								<input class="ng-hide" value="{{.appObj.Id}}" name="appId" id="appId"/>
								<input ng-model="currentApp.id" value="{{.appObj.Id}}" readonly="readonly" class="ng-pristine ng-untouched ng-valid">
							</div>
						</div>
						<div class="field app-name">
							<div class="left-label ng-binding">
								应用名称
							</div>
							<div class="value">
								<input ng-model="currentApp.id" value="{{.appObj.Name}}" readonly="readonly" class="ng-pristine ng-untouched ng-valid"/>
							</div>
						</div>
						<div class="field app-short">
							<div class="left-label ng-binding">
								应用大小
							</div>
							<div class="value">
								<input ng-model="currentApp.id" value="{{.appObj.Size | FormatBytes}}" readonly="readonly" class="ng-pristine ng-untouched ng-valid">
							</div>
						</div>
						<div class="field app-id">
							<div class="left-label">
								应用图标
							</div>
							<div class="icon_select unploadIcon appicon" style="width: 100px; cursor: pointer">
								<img width="100" height="100" id="icon_img" style="border-radius: 17%" class="change_icon ng-isolate-scope" src="/{{.appObj.Icon}}">
							</div>
						</div>
						<div class="field app-deletion">
							<div class="left-label ng-binding">
								删除应用
							</div>
							<div class="value">
								<button id="delete-app" data="{{.appObj.Id}}" class="btn btn-danger btn-circle require-confirm">
									<span class="ng-scope">删除</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<script type="text/javascript" src="/static/js/list.js"></script>
</body>
</html>