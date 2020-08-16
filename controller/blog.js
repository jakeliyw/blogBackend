const xss = require('xss')
const { encryption } = require('../utils/cyrp')
const { exec } = require('../db/mysql')

const getList = async (author, tags, keyword, { start }) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (tags) {
    sql += `and tags='${tags}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc `
  if (start) {
    sql += `limit ${start}, 5 ;`
  }
  return await exec(sql)
}
//计算数据的总长度
const getListLen = async (tags) => {
  if (tags) {
    return (await exec(`SELECT COUNT(*) as count FROM main.blogs where  tags='${tags}';`))[0]['count']
  }
  return (await exec('SELECT COUNT(*) as count FROM main.blogs;'))[0]['count']
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}';`
  const sql1 = `update blogs set toalnum=toalnum+1 where id='${id}';`
  const rows = await exec(sql)
  await exec(sql1)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  //blogData 是个对象包含标题和内容
  const title = xss(blogData.title)
  const subContent = xss(blogData.subContent)
  const content = encryption(blogData.content)
  const author = blogData.author
  const tags = blogData.tags
  const createTime = Date.now()

  const sql = `
    insert into blogs (title,subContent,content,createtime,author,tags)values ('${title}','${subContent}','${content}',${createTime},'${author}','${tags}');
  `
  const installData = await exec(sql)
  return {
    id: installData.insertId,
  }
}

const updateBlog = async (id, blogData = {}) => {
  const title = xss(blogData.title)
  const content = encryption(blogData.content)
  const tags = blogData.tags
  const sql = `
    update blogs set title='${title}', content='${content}',tags='${tags}' where id=${id}
  `
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  // id 就是要删除博客的 id
  const sql = `delete from blogs where id='${id}' and author='${author}';`
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
  newBlog,
  updateBlog,
  delBlog,
}
