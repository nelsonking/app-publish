<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
	<link href="/static/app/download.css?day={{.day}}" rel="stylesheet">
	<style type="text/css">.wechat_tip, .wechat_tip > i {
			position: absolute;
			right: 10px
		}

		.wechat_tip {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			background: #3ab2a7;
			color: #fff;
			font-size: 14px;
			font-weight: 500;
			width: 135px;
			height: 60px;
			border-radius: 10px;
			top: 15px
		}

		.wechat_tip > i {
			top: -10px;
			width: 0;
			height: 0;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 12px solid #3ab2a7
		}

		.mask img {
			max-width: 100%;
			height: auto
		}</style>

	<script type="text/javascript">
        function mobile_provision() {
            document.getElementById('actions').innerHTML = '<p>请按 Home 键在桌面查看</p>';
        }

        function install_app(_link) {
            location.href = _link;

            if (!/android/.test(navigator.userAgent.toLowerCase())) {
                document.getElementById('actions').innerHTML = '<p>正在安装 ...</p>';

                setTimeout("mobile_provision()", 5000);
            }
        }
	</script>
</head>
<body>

{{if .weChat}}
	<div class="wechat_tip_content">
		<div class="wechat_tip"><i class="triangle-up"></i>请点击右上角<br>在浏览器中打开</div>
	</div>
{{else}}
	<span class="pattern left"><img src="/static/app/left.png"></span>
	<span class="pattern right"><img src="/static/app/right.png"></span>
{{end}}

<div class="out-container">
	<div class="main">
		<header>
			<div class="table-container">
				<div class="cell-container">
					<div class="app-brief">
						<div class="icon-container wrapper">
							<i class="icon-icon_path bg-path"></i>
							<span class="icon"><img src="/{{.appObj.Icon}}"/></span>
							<span class="qrcode">
								<img src="/tools/qrcode?url=app/{{.appObj.Id}}">
							</span>
						</div>

						<h1 class="name wrapper"><span class="icon-warp" style="margin-left:0px">
								{{if eq .appObj.Type 1}}
									<i class="icon-android"></i>{{.appObj.Name}}
								{{else}}
									<i class="icon-ios"></i>{{.appObj.Name}}
								{{end}}
							</span>
						</h1>
						<p class="scan-tips" style="margin-left:170px">扫描二维码下载<br/>或用手机浏览器输入这个网址：<span class="text-black">{{.currentLink}}</span></p>
						<div class="release-info">
							<p>
                                {{.appObj.VersionCode}} {{.appObj.BundleVersion}}
								（ Build {{.appObj.BundleId}}）- {{.appObj.Size | FormatBytes}}
							</p>
							<p>更新于：{{.appObj.CreatedAt}}</p>
						</div>

						<div id="actions" class="actions">
							{{if .weChat}}
								<button type="button">不支持在微信内下载安装</button>
							{{else}}
								<button onclick="install_app('/app/install/{{.appObj.Id}}')">下载安装</button>
                            {{end}}
						</div>
					</div>
				</div>
			</div>
		</header>

		<div class="footer">内测平台，请自行甄别应用风险！如有问题可通过邮件反馈。
			<a class="one-key-report" href="mailto:{{.Email}}">联系我们</a>
		</div>
	</div>
</div>

<div class="mask" style="display:none"></div>
</body>
</html>
