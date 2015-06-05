var http = require('http');
var monCon = require('./dao/demoMongodb');
var mysqlCon = require('./dao/demoMysql');

// 监听端口 process.env.PORT为 coding端口, 1340为本地或Daocloud端口
var appPort = process.env.PORT || 1340;

// 程序启动时在mongodb中先加入一条数据
monCon.add();

http.createServer(function(req, res) {

    // 验证mysql 是否链接
    mysqlCon.test(function(info) {

        // 验证 mongodb 是否链接
        monCon.searchOne()
            .then(function(data) {
                res.end(info + '    并从mongodb中取出了 ' + data.name);
            })
            .catch(function(e) {
                res.end(info + '    mongodb查询出错了 (┬＿┬)');
            });
    });

}).listen(appPort);
console.log('server listening on port: ' + appPort);