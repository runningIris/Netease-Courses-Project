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
	this.container = document.createElement('div'),
	this.container.className = 'course';
	this.obj = {
		img: document.createElement('img'),
		name: document.createElement('h5'),
		provider: document.createElement('div'),
		learnerCount: document.createElement('div'),
		price: document.createElement('div')

	}
	this.obj.price.innerText = '￥ ';
	for(var key in this.obj){
		this.obj[key].className = key;
		this.container.appendChild(this.obj[key]);

	}
}
function loadCourses(){
	
	var data = {
		url: 'http://study.163.com/webDev/couresByCategory.htm?pageNo='+ window.page + '&psize=20&type=' + window.type,
		async: true,
		success: function(data){
			window.totalPageCount = data['totalPage'];
			console.log(data)

			for(var i = 0; i < data.list.length; i++){
				window.courses[i].obj.img.src = data.list[i]['middlePhotoUrl'];
				var temp = ['name', 'price', 'provider', 'learnerCount'];
				for(var j = 0; j < temp.length; j++){
					window.courses[i].obj[temp[j]].innerText = data.list[i][temp[j]];
				}
			}
		}
	}
	getAjax(data);	
}

function pageTurner(totalPageCount){
	var container = $('.page-turner .index');
	for(var i = 0; i < totalPageCount; i++){
		var page = document.createElement('div');
		page.className = 'page';
		page.innerText = i + 1;
		container.appendChild(page);
	}
}

function setPage(){
	var pages = $$('.page');
	var prev = $('.page-turner .prev');
	var next = $('.page-turner .next');
	var chosenStyle = function(){
		for(var i = 0; i < pages.length; i++){
			pages[i].style.color = '#b3b3b3';
		}
		// pages.forEach(item, function(){
		// 	item.style.color = '#eef8f2';
		// })
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




function setCourse(){
	var container = $('.m-courses');
	window.courses = [];
	for(var i = 0; i < 20; i++){
		var course = new Course();
		container.appendChild(course.container)
		window.courses.push(course);
	}

	window.page = 1;
	window.type = 10;
	window.size = 20;
	tabEvent();
	console.log('page turner');
	loadCourses();
	pageTurner(4);
	setPage();

}