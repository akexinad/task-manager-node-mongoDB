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

// MORE TESTS TO DO
//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks