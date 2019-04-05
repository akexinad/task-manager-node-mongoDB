const request = require('supertest')
const app = require('../src/app.js')
const Task = require('../src/models/task.js')
const { 
    userOneId,
    userOne,
    userTwoId,
    userTwo, 
    taskOne, 
    taskTwo, 
    taskThree, 
    setupDatabase 
} = require('./fixtures/db.js')

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

test('Should fetch all [2] tasks for userOne', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200)
    
    // Assert that there are two items in the tasks list
    expect(response.body.length).toEqual(2)  
})

test('Should NOT delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${ taskOne._id }`)
        .set('Authorization', `Bearer ${ userTwo.tokens[0].token }`)
        .send()
        .expect(404)
    
    // Assert that the task is still in the database
    expect(response.body).not.toBeNull()
    // OR
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should not create task with invalid description/completed', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${ userTwo.tokens[0].token }`)
        .send({
            description: "",
            completed: true
        })
        .expect(400)
})

test('Should not update task with invalid description/completed', async () => {
    await request(app)
        .patch(`/tasks/${ taskThree._id }`)
        .set('Authorization', `Bearer ${ userTwo.tokens[0].token }`)
        .send({
            description: "",
            completed: false
        })     
        .expect(500)
})

test('Should delete user task', async () => {
    await request(app)
        .delete(`/tasks/${ taskThree._id }`)
        .set('Authorization', `Bearer ${ userTwo.tokens[0].token }`)
        .send()
        .expect(200)        
})

test('Should not update other users task', async () => {
    await request(app)
        .patch(`/tasks/${ taskOne._id }`)
        .set('Authorization', `Bearer ${ userTwo.tokens[0].token }`)
        .send({
            description: "changing someone elses task",
            completed: false
        })     
        .expect(404)
})

test('Should fetch user task by id', async () => {
    await request(app)
        .get(`/tasks/${ taskTwo._id }`)
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200)
})

test('Should not fetch user task by id if unauthenticated', async () => {
    await request(app)
        .get(`/tasks/${ taskTwo._id }`)
        .send()
        .expect(401)
})

test('Should not fetch other users task by id', async () => {
    await request(app)
        .get(`/tasks/${ taskTwo._id }`)
        .set('Authorization', `Bearer ${ userTwo.tokens[0].token }`)
        .send()
        .expect(500)
})

// test('Should fetch only completed tasks', async () => {

// })


// test('Should fetch only completed tasks', () => {

// })
 
// test('Should fetch only incomplete tasks', () => {

// })

// test('Should sort tasks by description/completed/createdAt/updatedAt', () => {
    
// })

// test('Should fetch page of tasks', () => {
    
// })