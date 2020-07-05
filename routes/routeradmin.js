const router = require('koa-router')()
const { getAdmins } = require('../controller/routeradmin')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api')

router.get('/getAdmins', async (ctx, next) => {
  let listData = await getAdmins()
    if (ctx.session.realname == null) {
      ctx.body = new ErrorModel('抱歉未登陆')
      return
    }
  ctx.body = new SuccessModel(listData)
})

module.exports = router
