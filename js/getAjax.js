//获取Ajax
var getAjax = function(data){
	var obj = {
		type: data.type || 'GET',
		url: data.url,
		sync: data.sync || 'true',
		contentType: data.contentType || 'application/x-www-form-urlencoded',
		success: data.success
	}

	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	} else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	xhr.open(obj.type, obj.url, obj.sync)
	xhr.setRequestHeader('Content-type', obj.contentType)
	if(obj.type === 'GET'){
		xhr.send(null);
	} else{
		xhr.send('Content-type', obj.contentType);
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var data = JSON.parse(xhr.responseText);
			obj.success(data);
		}
	}
}
// var object;
// var data = {
// 	url: 'http://study.163.com/webDev/couresByCategory.htm?pageNo=2&psize=15&type=10',
// 	async: true,
// 	success: function(data){
// 		object = data;
// 	}
// }

// getAjax(data);
