const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true, // Indexes the data in mongodb, allowing for quicker access.
  useFindAndModify: false,
})
