const router = require('koa-router')()
const { decryption } = require('../utils/cyrp') //显示数据不是乱码
const {
  getList,
  getListLen,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require('../controller/blog')
//这是提示信息
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  let author = ctx.query.author || ''
  const tags = ctx.query.tags || ''
  const keyword = ctx.query.keyword || ''

  const { start = 0 } = ctx.query

  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('未登陆')
      return
    }
    author = ctx.session.username
  }
  const listData = await getList(author, tags, keyword, { start })
  const listLen = await getListLen(tags)
  ctx.body = new SuccessModel({ listData, listLen })
})

router.get('/detail', async function (ctx, keyword) {
  let data = await getDetail(ctx.query.id)
  data.content = decryption(data.content)
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async function (ctx, keyword) {
  const body = ctx.request.body
  body.author = ctx.session.username  //新建博客是一定要登陆之后才能新建的
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async function (ctx, keyword) {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/del', loginCheck, async function (ctx, keyword) {
  const author = ctx.session.username
  const val = await delBlog(ctx.query.id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})
module.exports = router
