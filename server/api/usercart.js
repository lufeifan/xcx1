module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const request = require('request');
    const User = require('../db/models/user')
    const Goodlist = require('../db/models/goodlist')
    // 获取openid
    router.get('/login/:code', (req, res) => {

        let appid="wx8e618ad393ce0bdf"
        let secret='bca452d090d7567a6f9a9a0e4ccaa5ed'
        let urlStr = 'https://api.weixin.qq.com/sns/jscode2session?appid='
        +appid+'&secret='+secret+'&js_code='
        + req.params.code 
        + '&grant_type=authorization_code'

        request(urlStr, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body)
                res.send(data)
                //查询数据库是否有该用户
                User.findOne({ 
                    openid:data.openid,
                })
                .then(result=>{
                    if (result) {
                        // User.create({_id:data.openid})
                    }else{
                        User.create({openid:data.openid})
                    }
                })
            }
        })
    })
    //添加到购物车的数据
    router.post('/usercart/:id', async (req, res) => {
        const items = await Goodlist.find({_id:{$all:req.params.id}})
        const model = await User.updateMany(
            {openid:req.body.openid},
            {'$push':{"usercart":{_id:req.params.id,
            image:items[0].image,content:items[0].content,
            name:items[0].name,price:items[0].price}}})
        res.send(model)
    })
    //获取购物车内容
    router.get('/usercart/:id', async (req, res) => {
        const items = await User.find({openid:{$all:req.params.id}})
        res.send(items)
    })
    
    // 删除购物车
    router.delete('/usercart/:id', async (req, res) => {
        await User.updateOne({},{$pull:{usercart:{_id:req.params.id}}})
        res.send({
            success: true
        })
    })

    app.use('/api', router)
}