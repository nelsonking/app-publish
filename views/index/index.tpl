<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
	<title>{{.Host}} - App托管服务分发平台|应用封装|安卓托管|iOS分发|ipa企业签名</title>
	<link href="/static/index/icons.css" rel="stylesheet">
	<link href="/static/index/bootstrap.css" rel="stylesheet">
	<script type="text/javascript" src="/static/pack/layer/jquery.js"></script>
</head>
<body>
<link href="/static/index/home.css?day={{.day}}" rel="stylesheet">

<nav class="navbar navbar-transparent" role="navigation">
	<div class="navbar-header">
		<a class="navbar-brand" href="/"><i class="icon-" style="font-size:40px;font-weight:bold">{{.Host}}</i></a>
	</div>
	<div class="collapse navbar-collapse navbar-ex1-collapse" ng-controller="NavbarController">
		<div class="dropdown">
			<div>
				<i class="icon-brace-left"></i>
				<ul class="navbar-bracket">
					<li><a href="/">首页</a><i class="icon-comma"></i></li>
					<li><a href="/apps">应用管理</a><i class="icon-comma"></i></li>
				</ul>
				<i class="icon-brace-right"></i>
			</div>
		</div>
	</div>
</nav>
<div class="super-container">
	<div class="section section-1 ready">
		<div class="beta-app-host">
			<pre class="typed-finish">
				<br>
				BetaAppHost
				{
				     return "{{.Host}}"
				}
			</pre>
			<b></b>
		</div>
		<div class="plane-wrapper" style="left:320px">
			<img class="plane" src="/static/index/plane.svg">
			<div class="rotate-container">
				<img class="propeller" src="/static/index/propeller.svg">
			</div>
		</div>
	</div>
</div>
</body>
</html>
