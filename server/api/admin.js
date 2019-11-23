module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const AdminUser = require('../db/models/adminuser')
    const jwt = require('jsonwebtoken')

    //校验
    const auth = async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        if (!token) {
            return res.status(401).send({
                message: '请先登录'
            })
        }
        const { id } = jwt.verify(token, app.get('secret'))
        if (!id) {
            return res.status(401).send({
                message: '请先登录'
            })
        }
        req.user = await AdminUser.findById(id)
        if (!req.user) {
            return res.status(401).send({
                message: '请先登录'
            })
        }
        await next()
    }
    // 登录
    router.post('/login', async (req, res) => {
        const { username, password } = req.body

        const user = await AdminUser.findOne({ username }).select('+password')

        if (!user) {
            return res.status(401).send({
                message: '用户不存在'
            })
        }
        //校验登录密码
        const isvalid = require('bcrypt').compareSync(password, user.password)
        if (!isvalid) {
            return res.status(401).send({
                message: '密码错误'
            })
        }
        // 返回token
        const token = jwt.sign({
            id: user._id,
        }, app.get('secret'))
        res.send({ token })
    })
    // 创建管理员
    router.post('/adminuser',auth, async (req, res) => {
        const model = await AdminUser.create(req.body)
        res.send(model)
    })
    // 修改管理员
    router.put('/adminuser/:id',auth, async (req, res) => {
        const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //获取全部管理员
    router.get('/adminuser',auth, async (req, res) => {
        const items = await AdminUser.find(req.body)
        res.send(items)
    })
    //获取id匹配到的管理员
    router.get('/adminuser/:id',auth, async (req, res) => {
        const model = await AdminUser.findById(req.params.id)
        res.send(model)
    })
    //删除管理员
    router.delete('/adminuser/:id',auth, async (req, res) => {
        const model = await AdminUser.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    app.use('/api', router)
}