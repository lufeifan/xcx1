//后台管理员
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: String,      //管理员账号
    password:{             //管理员密码
        type: String,
        // 查不出密码
        select:false,
        //加密密码
        set(val){
            return require('bcrypt').hashSync(val,10)
        }
    }
})
module.exports = mongoose.model('AdminUser', schema)