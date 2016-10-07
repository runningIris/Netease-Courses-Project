function tabEvent(){
	var tabs = $('.m-tabs').children;

	function changeState0(i){
		return function(){
			tabs[i].className = 'focus';
			tabs[(i+1) % 2].className = 'sub';
			window.type = (i+1) * 10;
			loadCourses(window.courses,window.type);
			// console.log(window.type)
		}
		
	}
	for(var i = 0; i < tabs.length; i++){
		tabs[i].addEventListener('click', changeState0(i));
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
	for(var key in this.obj){
		this.obj[key].className = key;
		this.container.appendChild(this.obj[key]);

	}
}
function loadCourses(courses, type){
	
	var data = {
		url: 'http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=' + type,
		async: true,
		success: function(data){
			for(var i = 0; i < data.list.length; i++){
				courses[i].obj.img.src = data.list[i]['middlePhotoUrl'];
				// delete courses[i].obj.img;
				// console.log(course.obj);
				var temp = ['name', 'price', 'provider', 'learnerCount'];
				for(var j = 0; j < temp.length; j++){
					courses[i].obj[temp[j]].innerText = data.list[i][temp[j]];
				}
			}
		}
	}
	getAjax(data);	
}

