var mysqlCon = require('../dao/demoMysql');

describe('mysql Test', function() {
    it('connection test', function(done) {
        mysqlCon.test(function(data) {
            data.should.be.eql('mysql链接成功~~~');
            done();
        });
    });
});
