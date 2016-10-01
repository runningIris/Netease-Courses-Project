//var config = require('./node_modules/config');
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var FServer = require('./server/FServer');
function index(){
	var indexPath = config.ui + '/index.html';
	fs.exists(indexPath, function(exists){
		if(!exists){
			throw err;
		} else {
			fs.readFile(indexPath, function(err, data){
				if(err){
					throw err;
				} else {
					function onRequest(req, res){
						//取得文件路径
						var pathname = url.parse(req.url).pathname;
						//获取文件扩展名（包含前置）
						var extname = path.extname(pathname);
						var type = extname.slice(1);
						//获取下载文件在磁盘上的路径，
						var realPath = config.root + pathname;
						if(extname===''){
							res.writeHead(200, {'Content-Type': 'text/html'});
							res.write(data);
							res.end();
						} else{
							FServer.filesLoad(realPath, type, req, res);
						}
					}
					http.createServer(onRequest).listen(config.port);
				}
			})
		}
	})
}
exports.index = index;

