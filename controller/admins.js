const { exec } = require('../db/mysql')

const getAdmins = () => {
  let sql = `select * from admins`
  return exec(sql)
}

module.exports = {
  getAdmins
}
