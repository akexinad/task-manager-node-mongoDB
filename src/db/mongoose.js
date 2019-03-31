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
  },

  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if ( !validator.isLength(value, { min: 6 }) ) {
        throw new Error('Must be at least six characters long')
      } else if (value.toLowerCase().includes("password")) {
        throw new Error('Cannot include the word password')
      }
    }
  }
})

// const newUser = new User({
//   name: '     Fellini       ',
//   email: 'EMAIL@YES.COM',
//   password: 'PASSWORD123',
// })
//
// newUser.save().then( () => {
//   console.log('New user saved:\n', newUser);
// }).catch( error => {
//   console.log(error.message);
// })

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  }
})

newTask = new Task({
  description: '',
})

newTask.save().then( () => {
  console.log("New task saved\n", newTask);
}).catch( error => {
  console.log(error.message);
})
