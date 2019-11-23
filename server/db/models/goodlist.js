//商品
var mongoose = require('mongoose')
var ArticleSchema = new mongoose.Schema({
    name: String,           //名称
    image: Array,           //图片
    price: Number,          //价格
    content: String,        //内容
    radio: String,          //分类
    freight:Number,          //运费
    buyend:String             //售后
})

module.exports = mongoose.model('Goodlist', ArticleSchema)
