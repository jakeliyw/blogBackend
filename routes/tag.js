const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {
  getList,
  getListLen,
  getDetail,
  newTag,
  updateTag,
  delTag,
} = require('../controller/tag')

router.prefix('/api/blog')

router.get('/tagList', async (ctx, next) => {
  const keyword = ctx.query.keyword || ''
  const { start = 0 } = ctx.query
  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('未登陆')
      return
    }
  }
  const listData = await getList(keyword, { start })
  const listLen = await getListLen()
  ctx.body = new SuccessModel({ listData, listLen })
})

router.get('/tagDetail', async (ctx, next) => {
  const body = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(body)
})

router.post('/tagNew', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newTag(body)
  ctx.body = new SuccessModel(data)
})

router.post('/tagUpdate', loginCheck, async (ctx, next) => {
  const { id } = ctx.request.body
  const val = await updateTag(id, ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新标签失败')
  }
})

router.post('/tagDel', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const { id } = ctx.request.body
  const val = await delTag(id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除标签失败')
  }
})

module.exports = router
