require('dotenv').config()
const mysql = require('./../../lib/mysql')
const usersPut = require('./../../functions/users/users_put')

let insertId

describe('users/users_put.js', () => {
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
      await mysql.query('delete from users where email=?', ['user@test.com'])
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('update user', async () => {
      const event = {
        body: JSON.stringify({
          id: insertId,
          name: 'nameputtest',
          email: 'user@test.com'
        })
      }
      const res = await usersPut(event)
      expect(res.statusCode).toBe(200)
    })
    it('valid code user', async () => {
      const event = {}
      const res = await usersPut(event)
      expect(res.statusCode).toBe(400)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await usersPut()
      expect(res.statusCode).toBe(400)
    })
  })
})
