const router = require('koa-router')()
const { getMenu } = require('../controller/menu')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api')

router.get('/menu', async (ctx, next) => {
  let listData = await getMenu()
  // const menu = listData.filter(item => {
  //   if (ctx.session.realname === 'admin') {
  //     return item
  //   }
  //   return item.id < 5
  // })
  ctx.body = new SuccessModel(listData)
})

module.exports = router
