require('../src/db/mongoose')
const Task = require('../src/models/task.js')

// Task.findByIdAndDelete({ _id: '5ca06523203448611378da6e' })
// .then( (task) => {
//   console.log(task);
//   return Task.countDocuments({ completed: false })
// })
// .then( (result) => {
//   console.log(result);
// })
// .catch( (e) => {
//   console.log(e);
// })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('5ca06202069671607a21cc7c')
.then( count => {
  console.log(count);
})
.catch( e => {
  console.log(e);
})
