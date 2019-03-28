const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true // Indexes the data in mongodb, allowing for quicker access.
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    }
  }
})

const newUser = new User({
  name: '     Fellini       ',
  email: 'EMAIL@YES.COM'
})

newUser.save().then( () => {
  console.log('New user saved:\n', newUser);
}).catch( error => {
  console.log(error.message);
})

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     required: true
//   }
// })
//
// newTask = new Task({
//   description: 'clean house',
//   completed: false,
// })
//
// newTask.save().then( () => {
//   console.log("New task saved\n", newTask);
// }).catch( error => {
//   console.log(error.message);
// })
