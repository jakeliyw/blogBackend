const {exec} = require('../db/mysql')

const getList = async (keyword) => {
  let sql = `select * from blogTimeline where 1=1 `
  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return await exec(sql)
}

const newTime = async (timeData = {}) => {
  const title = timeData.title
  const content = timeData.content
  const createtime = Date.now()
  const sql = `insert into blogTimeline (title,content,createtime)values ('${title}','${content}','${createtime}');`
  const installData = await exec(sql)
  return {
    id: installData.insertId,
  }
}

const updateTime = async (id,timeData = {}) => {
  const title = timeData.title
  const content = timeData.content
  const sql = `update blogTimeline set title='${title}',content='${content}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delTime = async (id) => {
  const sql = `delete from blogTimeline where id='${id}'`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  newTime,
  updateTime,
  delTime
}
