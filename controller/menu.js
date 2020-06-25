const { exec } = require('../db/mysql')

const getMenu = () => {
  let sql = `select * from menu`
  return exec(sql)
}

module.exports = {
  getMenu
}
