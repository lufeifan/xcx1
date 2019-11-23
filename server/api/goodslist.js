module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Goodlist = require('../db/models/goodlist')
    //创建数据
    router.post('/getgoodslist', async (req, res) => {
        const model = await Goodlist.create(req.body)
        res.send(model)
    })
    //获取全部数据
    router.get('/getgoodslist', async (req, res) => {
        const items = await Goodlist.find(req.body)
        res.send(items)
    })
    //寻找id匹配到的数据
    router.get('/getgoodslist/:id', async (req, res) => {
        const items = await Goodlist.findById(req.params.id)
        res.send(items)
    })
    //修改id匹配到的数据
    router.put('/getgoodslist/:id', async (req, res) => {
        const items = await Goodlist.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
        
    })
    //删除id匹配到的指定数据
    router.delete('/getgoodslist/:id', async (req, res) => {
        await Goodlist.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    //获取分类列表
    router.get('/getlist/:id', async (req, res) => {
        const items = await Goodlist.find({radio:{$all:req.params.id}})
        res.send(items)
    })

    app.use('/api', router)
}