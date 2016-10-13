//登录及关注界面
function login(){
	//登录弹窗的HTML结构
	
	var modal = '<div class="m-login">\
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

	var logout = '<div class="logout"> \
						<div class="check-icon"></div> 已关注 | <span class="cancel">取消</span> \
					</div>'

	var login = ''

	//登录弹窗节点
	var loginNode = html2node(loginStr);
	//弹窗关闭节点
	var hideBtn = $(loginNode,'.m-login .close-icon');
	//弹窗提交节点
	var submitBtn = $(loginNode, '.m-login .submit');

	//已登录节点
	var logoutNode = html2node(logoutStr);
	var logoutBtn = $(logoutNode, '.cancel');

	//关注节点
	var showBtn = $('.m-nav .login');
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
		// var test_user = 'Mary';
		// var test_password = '123456';

		var user = $(loginNode,'.user').value;
		var password = $(loginNode,'.password').value;
		checkInfo();
		//登录成功后关闭弹窗、粉丝数+1、移除关注node、添加已关注node
		// if(user == test_user && password == test_password){
		// 	hide();
		// 	fans.innerHTML = parseInt(fans.innerHTML) + 1;
		// 	showBtn.parentNode.removeChild(showBtn);
		// 	//插入注销
		// 	$('.m-nav .container').insertBefore(logoutNode, $('.m-nav .fans'))
		// }

		function checkInfo(){
		var data = {
			url: 'http://study.163.com /webDev/login.htm?userName=1&password=2',
			async: true,
			success: function(data){
				console.log(data);
				}
			}
		
		getAjax(data);
		}	

	}


	
	function logout(){
		//插入关注节点
		$('.m-nav .container').insertBefore(showBtn, $('.m-nav .fans'))
		logoutNode.parentNode.removeChild(logoutNode);
	} 

	showBtn.addEventListener('click', show);
	hideBtn.addEventListener('click', hide);
	submitBtn.addEventListener('click', submit);
	logoutBtn.addEventListener('click', logout);
}