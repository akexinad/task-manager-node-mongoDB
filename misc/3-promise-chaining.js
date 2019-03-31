require('../src/db/mongoose.js')
const User = require('../src/models/user.js')

User.findByIdAndUpdate('5ca04f961c94d15a81d309b7', { age: 1 })
.then( (user) => {
  console.log(user);
  return User.countDocuments({ age: 1 })
})
.then( (result) => {
  console.log(result);
})
.catch( (e) => {
  console.log(e);
})
