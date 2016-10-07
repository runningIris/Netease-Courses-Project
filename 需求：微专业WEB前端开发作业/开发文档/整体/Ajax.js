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