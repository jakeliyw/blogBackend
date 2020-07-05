const { exec } = require('../db/mysql')

const getTime = () => {
  let sql = `select * from routertimeline`
  return exec(sql)
}

module.exports = {
  getTime
}
