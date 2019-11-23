//连接数据库
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://localhost:27017/good'), {
        // mongoose.connect('mongodb://139.155.12.117:27017/go'), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}