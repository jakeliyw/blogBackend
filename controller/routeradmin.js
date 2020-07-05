const { exec } = require('../db/mysql')

const getAdmins = () => {
  let sql = `select * from routeradmins`
  return exec(sql)
}

module.exports = {
  getAdmins
}
