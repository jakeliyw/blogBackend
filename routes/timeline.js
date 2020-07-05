const router = require('koa-router')()
const {
  getList,
  detailTime,
  newTime,
  updateTime,
  delTime,
} = require('../controller/timeline')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/blog')
//获取时间列表
router.get('/timeAdmin', async (ctx, next) => {
  const keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('抱歉，您未登陆')
      return
    }
    author = ctx.session.username
  }
  const listData = await getList(keyword)
  ctx.body = new SuccessModel(listData)
})
// 获取详情
router.get('/timeDetail',async (ctx,next) => {
  const data = await detailTime(ctx.query.id)
  ctx.body = new SuccessModel(data)
})
//新建时间
router.post('/timeNew', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newTime(body)
  ctx.body = new SuccessModel(data)
})

router.post('/timeUpdate', loginCheck, async (ctx, next) => {
  const val = await updateTime(ctx.query.id, ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更改时间失败')
  }
})

router.post('/timeDel', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const val = await delTime(ctx.query.id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除时间失败')
  }
})

module.exports = router
