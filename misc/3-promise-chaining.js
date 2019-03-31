require('../src/db/mongoose.js')
const User = require('../src/models/user.js')

// User.findByIdAndUpdate('5ca04f961c94d15a81d309b7', { age: 1 })
// .then( (user) => {
//   console.log(user);
//   return User.countDocuments({ age: 1 })
// })
// .then( (result) => {
//   console.log(result);
// })
// .catch( (e) => {
//   console.log(e);
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('5ca04f961c94d15a81d309b7', 2)
.then( count => {
  console.log(count);
})
.catch( e => {
  console.log(e);
})
