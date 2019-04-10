require('dotenv').config()
const mysql = require('./../../lib/mysql')

describe('users/users_get.js', () => {
    beforeAll(async () => {
        try {
          const insert = await mysql.query('insert into users (name, email) values (?,?)', ['User test', 'user@test.com'])
          insertId = insert.insertId
        } catch (error) {
          console.log('error -> ', error)
        }
    })
    afterAll(async () => {
        try {
          await mysql.query('delete from users')
        } catch (error) {
          console.log('error -> ', error)
        }
    })
  describe('Should execute a query', () => {
    it('return all users', async () => {
      try {
        const res = await mysql.query('select * from users')
        expect(res.length).toBeGreaterThanOrEqual(1)
      } catch (error) {
        console.log('error -> ', error)
      }
    })
  })
  describe('Should fail', () => {
    it('return error mysql', async () => {
        
      try {
        await mysql.query('select * froms users')
      } catch (error) {
        expect(error.toString().toUpperCase().indexOf('ERROR') !== -1).toBe(true)
      }
    })
  })
})
