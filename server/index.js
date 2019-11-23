const express = require("express")
const qnconfig = require('./config.js')
const app = express()

//设置secret常量
app.set('secret','abcdefg')
app.use(express.json())
//跨域请求访问
app.use(require('cors')())
//传入app
require('./db/db')(app)
require('./api/goodslist')(app)
require('./api/usercart')(app)
require('./api/useraddress')(app)
require('./api/admin')(app)

//获取七牛云token
app.get('/api/token', (req, res, next) => {
    res.status(200).send(qnconfig.uploadToken)
  })
//监听3333端口
app.listen(3333, () => {
    console.log("http//localhost:3001")
})
