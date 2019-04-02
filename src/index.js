const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${ port }`);
})

const Task = require('./models/task.js')
const User = require('./models/user.js')

const main = async () => {
  // const task = await Task.findById('5ca3171e43947f1fa18961e1')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)

  const user = await User.findById('5ca31608f77c241f51de83db')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks);
}

main()
