// CRUD create read update destroy
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Destructured the above
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.')
  }

  console.log('Connected!')

  const db = client.db(databaseName)

  // db.collection('users').updateOne({
  //   _id: new ObjectID("5c99effce4f198d45895f8d6")
  // }, {
  //   $inc: {
  //     age: 100
  //   }
  // }).then( (result) => {
  //   console.log(result);
  // }).catch( (error) => {
  //   console.log(error);
  // })

  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then( (result) => {
    console.log(result.modifiedCount);
  }).catch( (error) => {
    console.log(error);
  })

})
