module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const User = require('../db/models/user')

    //添加收货地址,用当前时间做唯一标识
    router.post('/useraddress/:id', async (req, res) => {
        var sd = require('silly-datetime');
        var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        const model = await User.updateMany(
            { openid: req.params.id },
            {
                '$push': {
                    'address': {
                        time: time,
                        who: req.body.who, tel: req.body.tel,
                        where: req.body.where, detail: req.body.detail,
                        select: false
                    }
                }
            })
        res.send(model)
    })
    //获取id匹配到的地址
    router.get('/useraddress/:id', async (req, res) => {
        const items = await User.find({ openid: { $all: req.params.id } })
        res.send(items)
    })
    //修改id匹配到的地址
    router.put('/useraddress/:id', async (req, res) => {
        const items = await User.updateMany({ 'address.time': req.params.id },
            {
                $set: {
                    "address.$.who": req.body.who, "address.$.tel": req.body.tel,
                    "address.$.where": req.body.where, "address.$.detail": req.body.detail
                }
            }, { upsert: true })
        res.send(req.body)
    })
    // 删除id匹配到的地址
    router.delete('/useraddress/:id', async (req, res) => {
        const items = await User.updateOne({}, { $pull: { address: { time: req.params.id } } })
        res.send(items)
    })

    app.use('/api', router)
}