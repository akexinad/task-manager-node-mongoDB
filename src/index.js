const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express()
const port = process.env.PORT || 3001

const multer = require('multer')
const upload = multer({
  dest: 'images' // dest = destination
})

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${ port }`);
})

const Task = require('./models/task.js')
const User = require('./models/user.js')
