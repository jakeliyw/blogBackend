const { exec } = require('../db/mysql')

const getTag = () => {
  let sql = `select * from routertag`
  return exec(sql)
}

module.exports = {
  getTag
}
