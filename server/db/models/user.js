//用户
var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
    openid: String,     //唯一标识
    address:Array,     //地址
    usercart:Array,     //购物车
})

module.exports = mongoose.model('user', UserSchema)
