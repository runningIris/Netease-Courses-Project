function login(){
	//登录弹窗的HTML结构
	var loginStr = '<div class="m-login">\
			<div class="align"></div> \
			<div class="wraper"> \
				<div class="content"> \
					<h4>登录网易云课堂</h4> \
					<input class="user" type="text" placeholder="账号"> \
					<input class="password" type="password" placeholder="密码"> \
					<input class="submit" type="submit" value="登录"> \
				</div> \
				<span class="close-icon">×</span> \
			</div> \
		</div>'

	var logoutStr = '<div class="logout"> \
						<div class="check-icon"></div> 已关注 | <span class="cancel">取消</span> \
					</div>'

	//登录弹窗节点
	var loginNode = html2node(loginStr);
	//弹窗关闭节点
	var lg_hide_Btn = $(loginNode,'.m-login .close-icon');
	//弹窗提交节点
	var lg_submit_Btn = $(loginNode, '.m-login .submit');

	//已登录节点
	var logoutNode = html2node(logoutStr);
	var lg_logout_Btn = $(logoutNode, '.cancel');

	//关注节点
	var lg_show_Btn = $('.m-nav .login');
	//导航粉丝数节点
	var fans = $('.fans .num');
	//初始化粉丝数
	var fans_num = 45;
	fans.innerHTML = fans_num;

	function show(){
		document.body.appendChild(loginNode);
	}
	function hide(){
		document.body.removeChild(loginNode);
	}
	function submit(){
		//预设的账号登录
		var test_user = 'Mary';
		var test_password = '123456';

		var user = $(loginNode,'.user').value;
		var password = $(loginNode,'.password').value;

		//登录成功后关闭弹窗、粉丝数+1、移除关注node、添加已关注node
		if(user == test_user && password == test_password){
			hide();
			fans.innerHTML = parseInt(fans.innerHTML) + 1;
			lg_show_Btn.parentNode.removeChild(lg_show_Btn);
			//插入注销
			$('.m-nav .container').insertBefore(logoutNode, $('.m-nav .fans'))
		}

	}
	function logout(){
		//插入关注节点
		$('.m-nav .container').insertBefore(lg_show_Btn, $('.m-nav .fans'))
		logoutNode.parentNode.removeChild(logoutNode);
	} 

	lg_show_Btn.addEventListener('click', show);
	lg_hide_Btn.addEventListener('click', hide);
	lg_submit_Btn.addEventListener('click', submit);
	lg_logout_Btn.addEventListener('click', logout);
}