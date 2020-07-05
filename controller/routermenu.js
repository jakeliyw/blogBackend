const { exec } = require('../db/mysql')

const getMenu = () => {
  let sql = `select * from routermenu`
  return exec(sql)
}

module.exports = {
  getMenu
}
