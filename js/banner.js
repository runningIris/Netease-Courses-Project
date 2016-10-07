function banner(){
	var Banner = function(){
		this.img = document.createElement('img');
		this.container = $('.m-banner');
		this.images = {};
		this.index = 1;
		this.navs = $$('.nav');
		this.next = $('.next');

	}

	Banner.prototype.init = function(){
		this.container.appendChild(this.img);
		this.initImgs();
		this.setImg();
		this.changeSlide();
	}
	Banner.prototype.setImg = function(){
		this.img.src = this.images[this.index];
		for(var i = 0; i<this.navs.length; i++){
			this.navs[i].style.backgroundColor='#fff';
		}
		this.navs[this.index-1].style.backgroundColor = '#000';
	}

	Banner.prototype.nextSlide = function(){
		if(this.index<3){
			this.index++;
		}else{
			this.index=1;
		}
		this.setImg();
	}

	Banner.prototype.navSlide = function(i){
		var fn = this;
		return function(){
			fn.index = i;
			fn.setImg();
		}
	}

	Banner.prototype.initImgs = function(){
		for(var i=1; i<4; i++){
			this.images[i] = './images/banner' + i + '.jpg';
		}
	}

	Banner.prototype.changeSlide = function(){
		for(var i = 0; i<this.navs.length; i++){
			this.navs[i].addEventListener('click', Banner.prototype.navSlide.bind(this)(i+1));
		}
	}

	var banner = new Banner();
	banner.init();
	setInterval(banner.nextSlide.bind(banner), 5000);
}
