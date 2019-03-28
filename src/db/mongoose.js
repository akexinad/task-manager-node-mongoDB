const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true // Indexes the data in mongodb, allowing for quicker access.
})

const User = mongoose.model('User', {
  name: {
    type: String,
  },
  age: {
    type: Number,
  }
})

// const newUser = new User({
//   name: 'Fellini',
//   age: 'seven'
// })
//
// newUser.save().then( () => {
//   console.log('New user saved:\n', newUser);
// }).catch( error => {
//   console.log('There was', error);
// })

const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  }
})

newTask = new Tasks({
  description: 'clean house',
  completed: false,
})

newTask.save().then( () => {
  console.log("New task saved\n", newTask);
}).catch( error => {
  console.log(error);
})
