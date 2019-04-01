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

const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'Red1234567!'
  const hash = await bcrypt.hash(password, 8)


  console.log(password);
  console.log(hash);

  const isMatch = await bcrypt.compare(password, hash)
  console.log(isMatch);

}

myFunction()
