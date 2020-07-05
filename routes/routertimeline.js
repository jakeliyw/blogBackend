const router = require('koa-router')()
const { getTime } = require('../controller/routertime')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api')

router.get('/getTime', async (ctx, next) => {
  let listData = await getTime()
  if (ctx.session.realname == null) {
    ctx.body = new ErrorModel('抱歉未登陆')
    return
  }
  ctx.body = new SuccessModel(listData)
})

module.exports = router
