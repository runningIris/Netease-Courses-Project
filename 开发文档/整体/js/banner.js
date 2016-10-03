

function set_img(){
	img.src = images[index];
	for(var i = 0; i<navs.length; i++){
		navs[i].style.backgroundColor='#fff';
	}
	navs[index-1].style.backgroundColor = '#000';
}
function chg_next(){
	if(index<3){
		index++;
	}else{
		index=1;
	}
	set_img();
}
function chg_nav(i){
	return function(){
		index = i;
		set_img();	
	}
}

var img = document.createElement('img');
var banner_container = document.querySelector('.m-banner');
banner_container.appendChild(img);

var images = {};
var index = 1;
for(var i=1; i<4; i++){
	images[i] = './images/banner' + i + '.jpg';
}
var navs = document.querySelectorAll('.nav');

set_img();

var next = document.querySelector('.next');

for(var i = 0; i<navs.length; i++){
	navs[i].addEventListener('click', chg_nav(i+1))
}
setInterval(chg_next, 6000);
