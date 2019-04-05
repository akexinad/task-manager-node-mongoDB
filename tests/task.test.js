const request = require('supertest')
const app = require('../src/app.js')
const Task = require('../src/models/task.js')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db.js')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            description: 'test task'
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})