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
		url: 'http://study.163.com/webDev/couresByCategory.htm?pageNo='+ window.page + '&psize=20&type=' + window.type,
		async: true,
		success: function(data){
			window.totalPageCount = data['totalPage'];
			for(var i = 0; i < data.list.length; i++){
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
function setCourse(){
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
	console.log('page turner');
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
			url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
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
							<video src="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4" controls="controls"></video>\
						</div>\
					</div>\
				</div>"'
	var container = html2node(str);
	console.log(container);
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