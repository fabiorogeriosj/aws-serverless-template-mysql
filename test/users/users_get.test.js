require('dotenv').config()
const mysql = require('./../../lib/mysql')
const usersGet = require('./../../functions/users/users_get')

let insertId

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
  describe('Should success', () => {
    it('return all users', async () => {
      const event = {}
      const res = await usersGet(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(200)
      expect(body.length).toBeGreaterThanOrEqual(1)
    })
    it('return an user', async () => {
      const event = {
        pathParameters: {
          id: insertId
        }
      }
      const res = await usersGet(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(200)
      expect(body.email).toBe('user@test.com')
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await usersGet()
      expect(res.statusCode).toBe(400)
    })
  })
})
