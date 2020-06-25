const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const timeline = require('./routes/timeline')
const users = require('./routes/users')
const menus = require('./routes/menus')
const blog = require('./routes/blog')
const admins = require('./routes/admins')

const { REDIS_CONF } = require('./conf/db')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug',
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = ['WJiol#23123_']
app.use(session({
  saveUninitialized: false,
  resave: true,
  //配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`, //写死本地的 redis
  }),
}))
// routes
app.use(timeline.routes(), timeline.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(menus.routes(), menus.allowedMethods())
app.use(admins.routes(), admins.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
