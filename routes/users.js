const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {login} = require('../controller/user')
const jwt = require('jsonwebtoken')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const {username,password} = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    const key = 'djkasdjkJDASKD21321'
    const realname = data.realname
    let token = jwt.sign(realname,key)
    //设置session
    ctx.session.username = data.username
    ctx.session.realname = token
    ctx.body = new SuccessModel({token})
    return
  }
  ctx.body = new ErrorModel('登陆失败')
})

module.exports = router
