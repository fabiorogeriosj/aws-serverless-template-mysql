require('dotenv').config()
const mysql = require('./../../lib/mysql')
const usersPost = require('./../../functions/users/users_post')

let insertId

describe('users/users_post.js', () => {
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
    it('valid user', async () => {
      const event = {
        body: JSON.stringify({
          name: 'user test name'
        })
      }
      const res = await usersPost(event)
      expect(res.statusCode).toBe(400)
    })
    it('should add a new user', async () => {
      const event = {
        body: JSON.stringify({
          name: 'user test name',
          email: 'user2post@test.com'
        })
      }
      const res = await usersPost(event)
      expect(res.statusCode).toBe(200)
    })
    it('should test email', async () => {
      const event = {
        body: JSON.stringify({
          name: 'user othertest',
          email: 'user@test.com'
        })
      }
      const res = await usersPost(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(400)
      expect(body).toHaveProperty('errorMessage')
    })
  })
  describe('Should fail', () => {
    it('should return an error body not send', async () => {
      const res = await usersPost()
      expect(res.statusCode).toBe(400)
    })
    it('should return valid user empty', async () => {
      const res = await usersPost({ body: '' })
      expect(res.statusCode).toBe(400)
    })
  })
})
