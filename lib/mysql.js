const mysql = require('mysql')

let MYSQL_HOST = process.env.MYSQL_HOST
let MYSQL_USER = process.env.MYSQL_USER
let MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
let MYSQL_PORT = process.env.MYSQL_PORT
let MYSQL_DB = process.env.MYSQL_DB


/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
    MYSQL_HOST = process.env.MYSQL_HOST_TEST
    MYSQL_USER = process.env.MYSQL_USER_TEST
    MYSQL_PASSWORD = process.env.MYSQL_PASSWORD_TEST
    MYSQL_PORT = process.env.MYSQL_PORT_TEST
    MYSQL_DB = process.env.MYSQL_DB_TEST
}

var connection  = mysql.createPool({
    connectionLimit: 10,
    host: MYSQL_HOST,
    user:MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
    port: MYSQL_PORT
})



const query = async (sql, params=[]) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, function (error, results, fields) {
        if (error) return reject(error)
        resolve(results)
    })
  })
}

module.exports.query = query
