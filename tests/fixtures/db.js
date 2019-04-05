const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user.js')
const Task = require('../../src/models/task.js')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Roberto Benigni",
    email: 'benigni@example.com',
    password: '44helloworld!',
    tokens: [{
        token: jwt.sign({ _id:userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: "Federico Fellini",
    email: 'fellini@example.com',
    password: '44ciaomondo',
    tokens: [{
        token: jwt.sign({ _id:userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: false,
    owner: userOne._id // or userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second task',
    completed: true,
    owner: userOne._id // or userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: false,
    owner: userTwo._id // or userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}