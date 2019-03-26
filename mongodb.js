// CRUD create read update destroy

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.')
  }

  console.log('Connected correctly!')

  // CREATE NEW COLLECTION
  const db = client.db(databaseName)

  // ADDING DOCUMENTS IN OUR COLLECTION
  // db.collection('users').insertOne({
  //   name: "Fellini",
  //   age: 44
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user.')
  //   }
  //
  //   console.log(result.ops)
  // })

  db.collection('tasks').insertMany([
    {
      description: 'Mop floor',
      completed: false,
    }, {
      description: 'Clean bathroom',
      completed: true,
    }, {
      description: 'Apply for jobs',
      completed: false,
    }
  ], (error, result) => {
    if (error) {
      return console.log('Unable to insert documents!')
    }

    console.log(result.ops)
  })
})
