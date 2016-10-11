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
// cookie
function setCookie(name, value, expires){
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + expires);
	document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';expires=' + expires + ';path=/';
}
function getCookie(name){
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1){
    	var cookieEnd = document.cookie.indexOf(';', cookieStart);
    	if (cookieEnd == -1){
        	cookieEnd = document.cookie.length;
     	}
    	cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    	return cookieValue;
	}
}
function deleteCookie(name){
	document.cookie = encodeURIComponent(name) + '=;expires=' + new Date(0);
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