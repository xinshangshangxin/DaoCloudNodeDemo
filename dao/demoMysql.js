var mysql = require('mysql');

var connection = mysql.createConnection({
    user:  process.env.MYSQL_USERNAME || 'root',
    password:  process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_INSTANCE_NAME || 'test',
    host: process.env.MYSQL_PORT_3306_TCP_ADDR || 'localhost',
    port: process.env.MYSQL_PORT_3306_TCP_PORT || '3306'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

function test(cb) {
    connection.query('SELECT 1', function(err, rows) {
        if (err) {
            cb('mysql链接出错!!!');
        }
        else {
            cb('mysql链接成功~~~');
        }
    });
}

exports.test = test;
