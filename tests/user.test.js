const request = require('supertest')
const app = require('../src/app.js')

test('Should sign up a new user', async () => {
    await request(app).post('/users')
    .send({
        "name": "Federico Fellini",
        "email": "federico@example.com",
        "password": "ottoemezzo1990"
    })
    .expect(201)
})