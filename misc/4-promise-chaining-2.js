require('../src/db/mongoose')
const Task = require('../src/models/task.js')

Task.findByIdAndDelete({ _id: '5ca06523203448611378da6e' })
.then( (task) => {
  console.log(task);
  return Task.countDocuments({ completed: false })
})
.then( (result) => {
  console.log(result);
})
.catch( (e) => {
  console.log(e);
})
