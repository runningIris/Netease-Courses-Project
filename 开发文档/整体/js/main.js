/* 预设登录账户 */
console.log('预设登录账户：\n User:Mary \n Password: 123456');

var banner = new Banner();
banner.init();
setInterval(banner.nextSlide.bind(banner), 5000);

var sprite = './images/sprite.png';

var products = $$('.m-3products .logo');

var height = -98;
var width = -11;
for(var i = 0; i < products.length; i++){
	products[i].style.backgroundImage = 'url(' + sprite + ')';
	products[i].style.backgroundPosition = width + 'px ' + height + 'px';
	width -= 86;
}

var tabs = $('.m-tabs').children;
function changeState0(i){
	return function(){
		tabs[i].className = 'focus';
		tabs[(i+1) % 2].className = 'sub';
	}
	
}
for(var i = 0; i < tabs.length; i++){
	tabs[i].addEventListener('click', changeState0(i));
}
