const router = require('koa-router')()
const { getAdmins } = require('../controller/admins')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api')

router.get('/admins', async (ctx, next) => {
  let listData = await getAdmins()
    if (ctx.session.realname == null) {
      ctx.body = new ErrorModel('抱歉未登陆')
      return
    }
  ctx.body = new SuccessModel(listData)
})

module.exports = router
