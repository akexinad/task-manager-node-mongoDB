// CRUD create read update destroy

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.')
  }

  console.log('Connected!')

  const db = client.db(databaseName)

  db.collection('tasks').deleteOne({
    description: "Mop floor"
  }).then( result => {
    console.log(result.deletedCount);
  }).catch( error => {
    console.log(error);
  })

})
