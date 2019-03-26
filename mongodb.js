// CRUD create read update destroy

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

// Destructured the above
// const { MongoClient, ObjectID } = require('mongodb')

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length);
// console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.')
  }

  console.log('Connected!')

  // CREATE NEW COLLECTION
  const db = client.db(databaseName)


  db.collection('tasks').findOne({}, { sort:{$natural: -1 }}, (error, task) => {
    if (error) {
      return console.log('there was error');
    }

    console.log(task);
  })

  db.collection('tasks').find({ completed: false }).toArray( (error, tasks) => {
    if (error) {
      return console.log('there was error');
    }

    console.log(tasks);
  })



})
