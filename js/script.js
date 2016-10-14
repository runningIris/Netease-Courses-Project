//通知条模块
function inform(){
	var informCookie = getCookie('inform');
	var inform = $('.m-inform');
	var informClose = $(inform,'.close');
	if (!informCookie){
	 informClose.onclick = function (){
	     inform.parentNode.removeChild(inform);
	     setCookie('inform', 'true', '36000');
	 }
	} else{
	 inform.parentNode.removeChild(inform);
	}
}


//登录及关注界面
function follow(){
	//登录弹窗的HTML结构
	var nodes = {
		follow: html2node('<div class="follow"></div>'),
		unfollow: html2node('<div class="unfollow"> \
										<div class="check-icon"></div> 已关注 | <span class="cancel">取消</span> \
									</div>'),
		modal:html2node('<div class="m-login">\
									<div class="wraper"> \
										<div class="content"> \
											<h4>登录网易云课堂</h4> \
											<input class="user" type="text" placeholder="账号"> \
											<input class="password" type="password" placeholder="密码"> \
											<input class="submit" type="submit" value="登录"> \
										</div> \
										<span class="close-icon">×</span> \
									</div> \
								</div>'),
		container: $('.m-follow')
	}
	var events = {
		follow: function(){
			if(sessionStorage['loginSuc']){
				$('.fans .num').innerText = parseInt($('.fans .num').innerText) + 1;
				setFollowSession();
				nodes.container.removeChild(nodes.follow);
				nodes.container.appendChild(nodes.unfollow);
				sessionStorage['followSuc'] = true;
			} else{
				//显示登录节点，监听submit
				document.body.appendChild(nodes.modal);

			}
		},
		unfollow: function(){
			nodes.container.removeChild(nodes.unfollow);
			nodes.container.appendChild(nodes.follow);
			sessionStorage['followSuc'] = false;
			$('.fans .num').innerText = parseInt($('.fans .num').innerText) - 1;
		},
		submit: function(){
			var userName = hex_md5($(nodes.modal, '.user').value),
				password = hex_md5($(nodes.modal, '.password').value);
			console.log(userName, password);
			var data = {
				// url: 'https://study.163.com/webDev/login.htm?userName=studyOnline&password=study.163.com',
				url: 'https://study.163.com/webDev/login.htm?userName=' + userName + '&password=' + password,
				async: true,
				success: function(data){
					if(data == 1){
						sessionStorage['loginSuc'] = true;
						nodes.modal.parentNode.removeChild(nodes.modal);
						nodes.follow.onclick = events.follow;

					} else{
						alert('您的用户名和密码不匹配。')
					}
				}
			}
			getAjax(data);

		},
		close: function(){
			nodes.modal.parentNode.removeChild(nodes.modal);
		}

	}

	function setFollowSession(){
		var data = {
			url: 'https://study.163.com/webDev/attention.htm',
			async: true,
			success: function(data){
				if(data == 1){
					sessionStorage['followSuc'] = 'true';
					console.log(data);
				}
			}
		}
		getAjax(data);
	}

	function main(){
		$('.fans .num').innerText = 45;
		nodes.container.appendChild(nodes.follow);
		$(nodes.modal, '.close-icon').addEventListener('click', events.close);
		$(nodes.unfollow, '.cancel').addEventListener('click', events.unfollow);
		$(nodes.modal, '.submit').onclick = events.submit;
		nodes.follow.addEventListener('click', events.follow);		

	}
	main();
}


//轮播横幅
function banner(){
	var Banner = function(){
		this.img = document.createElement('img');
		this.container = $('.m-banner');
		this.images = {};
		this.index = 1;
		this.navs = $$('.nav');
		this.next = $('.next');

	}

	Banner.prototype.init = function(){
		this.container.appendChild(this.img);
		this.initImgs();
		this.setImg();
		this.changeSlide();
	}
	Banner.prototype.setImg = function(){
		this.img.src = this.images[this.index];
		for(var i = 0; i<this.navs.length; i++){
			this.navs[i].style.backgroundColor='#fff';
		}
		this.navs[this.index-1].style.backgroundColor = '#000';
	}

	Banner.prototype.nextSlide = function(){
		if(this.index<3){
			this.index++;
		}else{
			this.index=1;
		}
		this.setImg();
	}

	Banner.prototype.navSlide = function(i){
		var fn = this;
		return function(){
			fn.index = i;
			fn.setImg();
		}
	}

	Banner.prototype.initImgs = function(){
		for(var i=1; i<4; i++){
			this.images[i] = './images/banner' + i + '.jpg';
		}
	}

	Banner.prototype.changeSlide = function(){
		for(var i = 0; i<this.navs.length; i++){
			this.navs[i].addEventListener('click', Banner.prototype.navSlide.bind(this)(i+1));
		}
	}

	var banner = new Banner();
	banner.init();
	setInterval(banner.nextSlide.bind(banner), 5000);

}

//页面中部关于三个产品的介绍
function setProduct(){
	var sprite = './images/sprite.png';
	var products = $$('.m-3products .logo');
	var height = -98;
	var width = -11;
	for(var i = 0; i < products.length; i++){
		products[i].style.backgroundImage = 'url(' + sprite + ')';
		products[i].style.backgroundPosition = width + 'px ' + height + 'px';
		width -= 86;
	}
}

//tab选择课程类型
function tabEvent(){
	var tabs = $('.m-tabs').children;

	function changeState(i){
		return function(){
			tabs[i].className = 'focus';
			tabs[(i+1) % 2].className = 'sub';
			window.type = (i+1) * 10;

			loadCourses();
				
			console.log(window.type)
		}
		
	}
	for(var i = 0; i < tabs.length; i++){
		tabs[i].addEventListener('click', changeState(i));
	}
}

function Course(){

	var template = '<li class="course">\
							<div class="show">\
								<img>\
								<h5 class="name"></h5>\
								<div class="provider"></div>\
								<div class="learnerCount"></div>\
								<div class="price"></div>\
							</div>\
							<div class="hover">\
								<div class="content">\
									<h5 class="name"></h5>\
									<div class="learnerCount"></div>\
									<p class="provider"></p>\
									<p class="categoryName"></p>\
								</div>\
								<p class="description"></p>\
							</div>\
						</li>'
	this.nodeObj = html2node(template);

}

//加载课程
function loadCourses(){
	
	var data = {
		url: 'https://study.163.com/webDev/couresByCategory.htm?pageNo='+ window.page + '&psize=20&type=' + window.type,
		async: true,
		success: function(data){
			window.totalPageCount = data['totalPage'];
			for(var i = 0; i < data.list.length; i++){
				console.log(data.list[i])
				var course = window.courses[i].children[0];
				course.children[0].src = data.list[i]['middlePhotoUrl'];
				for(var j = 1; j < 5; j++){
					course.children[j].innerText = data.list[i][course.children[j].className];
				}
				course.children[4].innerText = '￥ ' + course.children[4].innerText

				//hover
				var hover = window.courses[i].children[1];
				var content = hover.children[0]
				for(var k = 0; k < content.children.length; k++){
					content.children[k].innerText = data.list[i][content.children[k].className];
				}
				var description = hover.children[1];
				description.innerText = data.list[i]['description'];

			}
		}
	}
	getAjax(data);	
}


//创建翻页器
function pageTurner(totalPageCount){
	var container = $('.page-turner .index');
	for(var i = 0; i < totalPageCount; i++){
		var page = document.createElement('div');
		page.className = 'page';
		page.innerText = i + 1;
		container.appendChild(page);
	}
}

//翻页器功能
function setPage(){
	var pages = $$('.page');
	var prev = $('.page-turner .prev');
	var next = $('.page-turner .next');
	var chosenStyle = function(){
		for(var i = 0; i < pages.length; i++){
			pages[i].style.color = '#b3b3b3';
		}
		pages[window.page - 1].style.color = '#456844';
	}
	var changePage = function(){
		window.page = this.innerText;
		loadCourses();
		chosenStyle();

	}
	 var nextPage = function(){
		if(window.page < 4){
			window.page += 1;
			loadCourses();
			chosenStyle();

		}
	}
	var prevPage = function (){
		if(window.page > 1){
			window.page -= 1;
			loadCourses();
			chosenStyle();
		}
	}
	prev.addEventListener('click', prevPage);
	next.addEventListener('click', nextPage);
	for(var i = 0; i < pages.length; i++){
		pages[i].addEventListener('click', changePage)
	}

}



//设置所有的课程内容
function setMainSection(){
	var container = $('.m-courses');
	window.courses = [];
	for(var i = 0; i < 20; i++){
		var course = new Course();
		container.appendChild(course.nodeObj)
		window.courses.push(course.nodeObj);
	}

	window.page = 1;
	window.type = 10;
	window.size = 20;
	tabEvent();
	loadCourses();
	pageTurner(4);
	setPage();

	setInterval(loadHotCourses(), 5000);
	loadVideo();

}

//加载最热课程
function loadHotCourses(){
	var flag = 0;
	var hotCourses = [];
	var container = $('.m-hotCourses .content')
	var hotCourse = function(){
		return html2node('<div class="container">\
							<img>\
							<div class="name"></div>\
							<div class="learnerCount"></div>\
						</div>')
	}
	for(var i = 0; i < 10; i++){
		var hc = hotCourse();
		hotCourses.push(hc);
		container.appendChild(hc);
	}
	return function(){
		flag = (flag + 1)%10
		var data = {
			url: 'https://study.163.com/webDev/hotcouresByCategory.htm',
			async: true,
			success: function(data){
				for(var i = 0; i < 10; i++){
					var img = hotCourses[i].children[0];
					var name = hotCourses[i].children[1];
					var learnerCount = hotCourses[i].children[2];
					img.src = data[i+flag]['smallPhotoUrl'];
					name.innerText = data[i+flag]['name'];
					learnerCount.innerText = data[i+flag]['learnerCount'];
				}
			}
			
		}
		getAjax(data);
	}
}

function loadVideo(){
	var str = '<div class="m-video">\
					<div class="wraper">\
						<div class="content">\
							<span class="close">×</span>\
							<h4>请观看下面的视频</h4>\
							<video src="https://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4" controls="controls"></video>\
						</div>\
					</div>\
				</div>'
	var container = html2node(str);
	var trigger = $('.m-institudes .video');
	function showVideo(){
		document.body.appendChild(container);
	}
	var closer = $(container, '.m-video .close');
	
	function closeVideo(){
		container.parentNode.removeChild(container);
	}
	trigger.addEventListener('click', showVideo);
	closer.addEventListener('click', closeVideo);
}