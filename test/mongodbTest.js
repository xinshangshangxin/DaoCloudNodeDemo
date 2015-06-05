var monCon = require('../dao/demoMongodb');

describe('mongodbTest', function() {
    it('search test', function(done) {
        monCon.add(function() {
            monCon.searchOne()
                .then(function(data) {
                    data.should.have.property('name', 'xinshangshangxin');
                    done();
                })
                .catch(function(e) {
                    // 一定错误
                    (0).should.eql(1);
                    done();
                });
        });
    });
});
