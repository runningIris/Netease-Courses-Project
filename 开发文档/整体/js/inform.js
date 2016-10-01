var informCookie = getCookie('inform');
var inform = document.getElementsByClassName('m-inform')[0];
var informClose = inform.getElementsByClassName('close')[0];
if (!informCookie){
 informClose.onclick = function (){
     inform.parentNode.removeChild(inform);
     setCookie('inform', 'true', '36000');
 }
} else{
 inform.parentNode.removeChild(inform);
}

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