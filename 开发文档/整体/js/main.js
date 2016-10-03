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

/* 预设登录账户 */
console.log('预设登录账户：\n User:Mary \n Password: 123456');
