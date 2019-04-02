const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express()
const port = process.env.PORT || 3001

//
// Without middleware: new request -> run route handler
//
// With middleware:    new request -> do something -> run route handler
//

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${ port }`);
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisisanewjwttoken', { expiresIn: '7 days' })
  console.log(token)

  const data = jwt.verify(token, 'thisisanewjwttoken')
  console.log(data);
}

myFunction()
