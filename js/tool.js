function $(){
	if(arguments.length == 1){
		return document.querySelector(arguments[0]);
	} else if(arguments.length == 2){
		return arguments[0].querySelector(arguments[1]);
	}
}

function $$(node,selector){
	if(arguments.length == 1){
		return [].slice.call(document.querySelectorAll(arguments[0]));
	} else if(arguments.length == 2){
		return [].slice.call(arguments[0].querySelectorAll(arguments[1]));
	}
}

//把字符串转化为节点
function html2node(str){
	var container = document.createElement('div');
	container.innerHTML = str;
	return container.children[0];
}

//获取Ajax
function getAjax(data){
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
			return obj.success(data);
		}
	}
}