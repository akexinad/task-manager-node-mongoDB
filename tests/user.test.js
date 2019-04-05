const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/user.js')

const userOne = {
    name: "Benigni",
    email: 'benigni@example.com',
    password: '44helloworld!'
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    await request(app).post('/users')
    .send({
        "name": "Federico Fellini",
        "email": "federico@example.com",
        "password": "ottoemezzo1990"
    })
    .expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
})

test('Should NOT login nonexistant user', async () => {
    await request(app).post('/users/login')
    .send({
        name: userOne.name,
        email: userOne.email,
        password: 'password'
    })
    .expect(400)
})