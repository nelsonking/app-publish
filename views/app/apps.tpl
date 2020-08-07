<!DOCTYPE html>
<html lang="zh-cn">

<head>
	<meta http-equiv="x-ua-compatible" content="IE=edge">
	<meta name="renderer" content="webkit">
	<title>我的应用 - {{.Host}}</title>
	<link href="/static/index/icons.css" rel="stylesheet">
	<link href="/static/index/bootstrap.css" rel="stylesheet">
	<link href="/static/index/manage.css" rel="stylesheet">
	<script type="text/javascript" src="/static/pack/layer/jquery.js"></script>
	<script type="text/javascript" src="/static/pack/layer/confirm-lib.js"></script>
	<script type="text/javascript" src="/static/index/uploadify.js"></script>
	<script type="text/javascript" src="/static/index/profile.js"></script>
	<script type="text/javascript" src="/static/index/drop.js"></script>
	<script type="text/javascript">
		var in_path = window.location.origin;
		var home_link = '/apps';
		var in_time = '';
		var in_upw = '';
		var in_uid = 0;
		var in_id = 0;
		var in_size = 200;
		var remote = {
			'open': '0',
			'dir': 'App-oss',
			'version': '1.0.0'
		};
	</script>
</head>

<body>
	<div class="navbar-wrapper ng-scope">
		<div class="ng-scope">
			<div class="navbar-header-wrap">
				<div class="middle-wrapper">
					<nav>
						<h1 class="navbar-title logo"><span onclick="location.href='/'">{{.Host}}</span></h1>
						<i class="icon-angle-right"></i>
						<div class="navbar-title primary-title"><a href="/apps>" class="ng-binding">我的应用</a></div>
					</nav>
				</div>
			</div>
		</div>
	</div>
	<div class="ng-scope" id="dialog-uploadify" style="display:none">
		<div class="upload-modal-mask ng-scope"></div>
		<div class="upload-modal-container ng-scope">
			<div class="flip-container flip">
				<div class="modal-backend plane-ready upload-modal">
					<div class="btn-close" onclick="location.reload()"><i class="icon-cross"></i></div>
					<div class="plane-wrapper">
						<img class="plane" src="/static/index/plane.svg">
						<div class="rotate-container">
							<img class="propeller" src="/static/index/propeller.svg">
						</div>
					</div>
					<div class="progress-container">
						<p class="speed ng-binding" id="speed-uploadify"></p>
						<p class="turbo-upload"></p>
						<div class="progress">
							<div class="growing" style="width:0%"></div>
						</div>
					</div>
					<div class="redirect-tips ng-binding" style="display:none">正在解析应用，请稍等...</div>
				</div>
			</div>
		</div>
	</div>
	<section class="ng-scope">
		<div class="page-apps ng-scope">
			<div class="middle-wrapper container-fluid">
				<div class="apps row">
					<upload-card class="components-upload-card col-xs-4 col-sm-4 col-md-4 app-animator">
						<div class="card text-center">
							<input type="file" id="upload_app" onchange="upload_app()" style="display:none">
							<div class="dashed-space" onclick="$('#upload_app').click()">
								<table>
									<tbody>
										<tr>
											<td>
												<i class="icon-upload-cloud2"></i>
												<div class="text drag-state"><span id="_drop1">拖拽到这里上传</span><span
														id="_drop2">快松手</span>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</upload-card>
					{{range $index,$apps := .listApps}}
					<div class="col-xs-4 col-sm-4 col-md-4 app-animator ng-scope">
						<div class="card app card-ios">
							{{if eq $apps.Type 1}}
							<i class="type-icon icon-android"></i>
							<div class="type-mark"></div>
							{{else}}
							<i class="type-icon icon-apple"></i>
							<div class="type-mark"></div>
							{{end}}

							<a class="appicon" href="/app/{{$apps.Id}}">
								<img class="icon ng-isolate-scope" width="100" height="100" src="/{{$apps.Icon}}">
							</a>

							<br>
							<p class="appname"><i class="icon-owner"></i><span class="ng-binding"> {{$apps.Name}}
								</span></p>
							<table>
								<tbody>
									{{ if eq $apps.Type 1}}
									<tr>
										<td class="ng-binding">应用平台：</td>
										<td><span class="ng-binding"> 安卓 </span></td>
									</tr>
									{{else}}
									<tr>
										<td class="ng-binding">应用平台：</td>
										<td><span class="ng-binding"> 苹果 </span></td>
									</tr>
									{{end}}
									<tr>
										<td class="ng-binding">应用标识：</td>
										<td><span class="ng-binding">{{$apps.BundleId}}</span></td>
									</tr>
									<tr>
										<td class="ng-binding">最新版本：</td>
										<td><span>{{$apps.VersionCode}}</span> <span
												class="ng-binding">{{$apps.BundleVersion}}</span></td>
									</tr>
									<tr>
										<td class="ng-binding">应用大小：</td>
										<td><span class="ng-binding">{{$apps.Size | FormatBytes}}</span></td>
									</tr>
									<tr>
										<td class="ng-binding">上传时间：</td>
										<td><span
												class="ng-binding">{{FormatTimeStamp $apps.CreatedAt "m-d H:i"}}</span>
										</td>
									</tr>
								</tbody>
							</table>

							<div class="action">
								<a href="/app/manage/{{$apps.AppCode}}" class="ng-binding" href="/apps"><i class="icon-pen"></i> 管理</a>
								<a href="/app/{{$apps.AppCode}}" target="_blank" class="ng-binding"><i class="icon-eye"></i>预览</a>

								<button class="btn btn-remove ng-scope" onclick="del_app({{$apps.Id}})">
									<i class="icon icon-trash"></i>
								</button>
							</div>
						</div>
					</div>
					{{ end }}
				</div>

				{{.paper}}
			</div>
		</div>
	</section>
	{{template "footer.tpl" .}}
</body>

</html>