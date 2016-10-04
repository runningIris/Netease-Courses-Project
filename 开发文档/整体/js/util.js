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