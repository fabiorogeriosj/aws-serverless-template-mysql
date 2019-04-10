require('dotenv').config()
const mysql = require('./../../lib/mysql')
const usersRemove = require('./../../functions/users/users_remove')

let insertId

describe('users/users_remove.js', () => {
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
    it('valid code user', async () => {
      const event = {}
      const res = await usersRemove(event)
      expect(res.statusCode).toBe(400)
    })
    it('remove user', async () => {
      const event = {
        body: JSON.stringify({
          id: insertId
        })
      }
      const res = await usersRemove(event)
      expect(res.statusCode).toBe(200)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await usersRemove()
      expect(res.statusCode).toBe(400)
    })
  })
})
