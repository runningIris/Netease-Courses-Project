function tabEvent(){
	var tabs = $('.m-tabs').children;

	function changeState0(i){
		return function(){
			tabs[i].className = 'focus';
			tabs[(i+1) % 2].className = 'sub';
			var type = (i+1) * 10;
			loadCourse(type);
		}
		
	}
	for(var i = 0; i < tabs.length; i++){
		tabs[i].addEventListener('click', changeState0(i));
	}
}