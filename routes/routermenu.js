const router = require('koa-router')()
const { getMenu } = require('../controller/routermenu')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api')

router.get('/menu', async (ctx, next) => {
  let listData = await getMenu()
  ctx.body = new SuccessModel(listData)
})

module.exports = router
