const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    
    if (event.pathParameters && event.pathParameters.id) {
      const user = await mysql.query('select id, name, email from users where id=?', [event.pathParameters.id])
      return util.bind(user.length ? user[0] : {})
    }

    const users = await mysql.query('select id, name, email from users')
    return util.bind(users)
  } catch (error) {
    return util.bind(error)
  }
}
