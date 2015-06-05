var mongoose = require('mongoose');

// 本地 mongodb链接地址
var mongodbUri = 'mongodb://127.0.0.1:27017/DaoCloudDemo';

try {
    // coding 链接地址
    mongodbUri = JSON.parse(process.env.VCAP_SERVICES).mongodb[0].credentials.uri;
}
catch (e) {
}

try {
    // 链接格式:    mongodb://user:pass@localhost:port/database
    // DaoCloud链接地址
    mongodbUri = 'mongodb://';

    if (process.env.MONGODB_USERNAME) {
        mongodbUri += process.env.MONGODB_USERNAME;

        if (process.env.MONGODB_PASSWORD) {
            mongodbUri += ":" + process.env.MONGODB_PASSWORD
        }
        mongodbUri += "@";
    }

    mongodbUri += (process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost')
        + ":" + (process.env.MONGODB_PORT_27017_TCP_PORT || 27017)
        + '/' + (process.env.MONGODB_INSTANCE_NAME || 'test');
}
catch (e) {
}

console.log(mongodbUri);

// 链接mongodb
var db = mongoose.connect(mongodbUri);

var nameSchema = new mongoose.Schema({
    name: {type: String}
});

var nameModel = db.model('demo', nameSchema);

// 添加
function add(cb) {
    // 判断是否存在
    searchOne({
        name: 'xinshangshangxin'
    }).then(function(data) {
        if (data) {
            console.log('已经存在');
            cb && cb();
        }
        else {
            //  添加一条
            nameModel.create({
                name: 'xinshangshangxin'
            }, function(err, doc) {
                cb && cb();
            });
        }
    });
}

// 按条件查找
function searchOne(condition) {
    return nameModel.findOne(condition || {});
}

exports.searchOne = searchOne;
exports.add = add;
