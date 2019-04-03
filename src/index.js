const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express()
const port = process.env.PORT || 3001

const multer = require('multer')
const upload = multer({
  dest: 'images', // dest = destination
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // These are the three ways you can callback
    // cb(new Error('File must be a PDF'))
    // cb(undefined, true)
    // cb(undefined, false)

    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('File must be a Word Document'))
    }

    cb(undefined, true)
  }
})

const errorMiddleware = (req, res) => {
  throw new Error('From my middleware')
}

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${ port }`);
})

const Task = require('./models/task.js')
const User = require('./models/user.js')
