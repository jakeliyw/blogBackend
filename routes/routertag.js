const router = require('koa-router')()
const { getTag } = require('../controller/routertag')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api')

router.get('/getTag', async (ctx, next) => {
  let listData = await getTag()
  if (ctx.session.realname == null) {
    ctx.body = new ErrorModel('抱歉未登陆')
    return
  }
  ctx.body = new SuccessModel(listData)
})

module.exports = router
