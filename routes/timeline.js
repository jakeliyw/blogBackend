const router =require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getList,
  newTime,
  updateTime,
  delTime
}=require('../controller/timeline')

router.prefix('/api/timeline')

//新建时间线
router.get('/list',async (ctx,next) => {
    const listData = await getList()
    ctx.body = new SuccessModel(listData)
})

router.post('/new', loginCheck,async(ctx,next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newTime(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', async(ctx,next) => {
  const val = await updateTime(ctx.query.id,ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/del', async(ctx,next) => {
  const author = ctx.session.username
  //拿到id
  const val = await delTime(ctx.query.id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
