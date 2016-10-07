function addContent(course){
	var img = document.createElement('img')
	var title = document.createElement('h5');
	title.innerText = ' 混音全揭秘 舞曲实战篇 揭秘音乐揭秘世界'
	var releaser = document.createElement('div');
	releaser.className = 'releaser';
	releaser.innerText = ' 音频帮';
	var subscriber = document.createElement('div');
	subscriber.className = 'subscriber';
	subscriber.innerText = '510';
	var payment = document.createElement('div');
	payment.className = 'payment';
	payment.innerText = '¥ 800';
	course.appendChild(img);
	course.appendChild(title);
	course.appendChild(releaser);
	course.appendChild(subscriber);
	course.appendChild(payment);
}

var courses = $$('.course');
for(var i = 0; i < courses.length; i++){
	addContent(courses[i]);
}

function getContent(){
	var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
                var hotlist=JSON.parse(xhr.responseText);
                console.log(hotlist[8].description);
            }
        }
    }
    xhr.open("get",'http://study.163.com/webDev/hotcouresByCategory.htm',true);
    xhr.send(null);
}
