const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = async (keyword) => {
  let sql = `select * from blogtimeline where 1=1 `
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  setInterval(async () => {
    const sql1 = `select * from blogtimeline where author='hakey';`
    await exec(sql1)
  },300000)
  return await exec(sql)
}

const detailTime = async (id) => {
  const sql = `select * from blogtimeline where id='${id}';`
  const rows = await exec(sql)
  return rows[0]
}

const newTime = async (timeData = {}) => {
  const title = xss(timeData.title)
  const content = timeData.content
  const createtime = Date.now()
  const author = timeData.author
  const sql = `
  insert into blogtimeline (title,content,createtime,author)values ('${title}','${content}','${createtime}','${author}');
  `
  const installData = await exec(sql)
  return {
    id: installData.insertId,
  }
}

const updateTime = async (id, timeData = {}) => {
  const title = timeData.title
  const content = timeData.content
  const sql = `update blogtimeline set title='${title}',content='${content}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delTime = async (id, author) => {
  const sql = `delete from blogtimeline where id='${id}' and author='${author}';`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  detailTime,
  newTime,
  updateTime,
  delTime,
}
