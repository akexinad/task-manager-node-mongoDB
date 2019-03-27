const doWorkCallback = (callback) => {
  setTimeout( () => {
    callback('This is error!', undefined) // NOTE: THE ORDER HERE IS IMPORTANT. FIRST ERROR THEN RESULT.
    callback(undefined, [1, 2, 3])
  }, 2000)
}

doWorkCallback( (error, result) => {
  if (error) {
    return console.log(error)
  }

  console.log(result)
})
