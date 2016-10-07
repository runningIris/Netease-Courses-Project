function loadCourses(){
	var Course = function(){
		this.container = document.createElement('div');
		this.container.className = 'course';
		this.img = document.createElement('img')
		this.name = document.createElement('h5');
		this.provider = document.createElement('div');
		this.provider.className = 'provider';
		this.learnerCount = document.createElement('div');
		this.learnerCount.className = 'learnerCount';
		this.price = document.createElement('div');
		this.price.className = 'price';
	}
	Course.prototype.init = function(){
		this.container.appendChild(this.img);
		this.container.appendChild(this.name);
		this.container.appendChild(this.provider);
		this.container.appendChild(this.learnerCount);
		this.container.appendChild(this.price);
	}
	tabEvent();
	var data = {
		url: 'http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=15&type=10',
		async: true,
		success: function(data){
			
			var container = $('.m-courses');
			for(var i = 0; i < data.list.length; i++){
				var course = new Course();
				container.appendChild(course.container)
				course.init();
				course.img.src = data.list[i]['middlePhotoUrl'];
				course.name.innerText = data.list[i]['name'];
				course.learnerCount.innerText = data.list[i]['learnerCount'];
				course.provider.innerText = data.list[i]['provider'];
				course.price.innerText = data.list[i]['price'];
			}
		}
	}

	getAjax(data);	
}


// obj={
// 	'totalCount': data['totalCount'],
// 	'totalPage': data['totalPage'],
// 	'pagination': {
// 		'pageIndex': data['pageIndex'],
// 		'pageSize': data['pageSize'],
// 		'totlePageCount': data['totlePageCount']
// 	},
// 	// 'list': [],
// }
// k = data;
// obj.list = new Array(data.list.length);
// for(var i = 0; i < data.list.length; i++){
// 	obj.list[i] = {};
// 	obj.list[i]['name'] = data.list[i]['name'];
// 	obj.list[i]['bigPhotoUrl'] = data.list[i]['bigPhotoUrl'];
// 	obj.list[i]['middlePhotoUrl'] = data.list[i]['middlePhotoUrl'];
// 	obj.list[i]['smallPhotoUrl'] = data.list[i]['smallPhotoUrl'];
// 	obj.list[i]['provider'] = data.list[i]['provider'];
// 	obj.list[i]['learnerCount'] = data.list[i]['learnerCount'];
// 	obj.list[i]['price'] = data.list[i]['price'];
// 	obj.list[i]['categoryName'] = data.list[i]['categoryName'];
// }
// console.log(obj.list[5]['middlePhotoUrl']);