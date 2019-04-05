const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app.js')
const User = require('../src/models/user.js')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Benigni",
    email: 'benigni@example.com',
    password: '44helloworld!',
    tokens: [{
        token: jwt.sign({ _id:userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: "Federico Fellini",
            email: "federico@example.com",
            password: "ottoemezzo1990"
        })
        .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body)
        .toMatchObject({
            user: {
                name: "Federico Fellini",
                email: "federico@example.com",
            },
            token: user.tokens[0].token
        })
    expect(user.password).not.toBe('ottoemezzo1990')
})



test('Should login existing user', async () => {
    const response = await request(app).post('/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)

    // Assert existence of second token
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
    
})

test('Should NOT login nonexistant user', async () => {
    const response = await request(app).post('/users/login')
    .send({
        name: userOne.name,
        email: userOne.email,
        password: 'password'
    })
    .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200)
})

test('Should NOT get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200)

    // Assert that user was deleted
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should NOT delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    
    // Here we use toEqual because toBe return false because {} === {} is false, because the browser checks if it is the same object in the same allocated memory, which it is not as they are two different blank objects.
    expect({}).toEqual({})
    
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    const user = await User.findById(userOneId)
    
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            name: 'Roberto Benigni'
        })
        .expect(200)
})

test('Should NOT update invalid user fields', async () => {
    const user = await User.findById(userOneId)
    user.location = 'Vergaio'

    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            location: 'Vergaio'
        })
        .expect(400)
})