const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true, // Indexes the data in mongodb, allowing for quicker access.
  useFindAndModify: false,
})
