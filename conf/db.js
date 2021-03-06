//node的进程信息,环境参数
const env = process.env.NODE_ENV

//配置
let MYSQL_CONF
let REDIS_CONF
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'main',
  }
  REDIS_CONF = {
    port: '6379',
    host: '127.0.0.1',
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'db',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'main',
  }
  REDIS_CONF = {
    port: '6379',
    host: 'cache',
  }
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
}
