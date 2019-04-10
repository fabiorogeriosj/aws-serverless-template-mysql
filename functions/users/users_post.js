const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    if (!body.name) return util.bind(new Error('Enter your name!'))
    if (!body.email) return util.bind(new Error('Enter your email!'))

    const checkUserExist = await mysql.query('select * from users where email=?', [body.email])
    if (checkUserExist.length) return util.bind(new Error('An account with this email already exists!'))

    const insert = await mysql.query('insert into users (name, email) values (?,?)', [body.name, body.email])
    return util.bind(insert)
  } catch (error) {
    return util.bind(error)
  }
}
