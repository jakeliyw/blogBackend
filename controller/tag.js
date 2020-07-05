const { exec } = require('../db/mysql')

// 获取数据
const getList = async ( keyword, { start, end }) => {
  let sql = `select * from tag where 1=1 `
  if (keyword) {
    sql += `and tags like '%${keyword}%'`
  }
  sql += `order by createtime desc `
  if (start) {
    sql += `limit ${start}, ${end};`
  }
  return await exec(sql)
}
//计算数据的总长度
const getListLen = async () => {
  return (await exec('SELECT COUNT(*) as count FROM myblog.tag;'))[0]['count']
}

// 获取数据详情
const getDetail = async (id) => {
  const sql = `select * from tag where id=${id};`
  const rows = await exec(sql)
  return rows[0]
}

// 新建标签
const newTag = async (tagData = {}) => {
  const tags = tagData.tags
  const author = tagData.author
  const createtime = Date.now()
  const sql = `insert into tag(tags,createtime,author)values ('${tags}',${createtime},'${author}');`
  const insertData = await exec(sql)
  return {
    id: insertData.insertId,
  }
}

// 更新标签
const updateTag = async (id, tagData = {}) => {
  const tags = tagData.tags
  const sql = `update tag set tags='${tags}' where id=${id};`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

//删除标签
const delTag = async (id, author) => {
  const sql = `delete from tag where id='${id}' and author='${author}'`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getListLen,
  getDetail,
  newTag,
  updateTag,
  delTag,
}
