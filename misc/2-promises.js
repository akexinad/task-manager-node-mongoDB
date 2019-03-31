// const doWorkPromise = new Promise( (resolve, reject) => {
//   setTimeout( () => {
//     resolve([1, 2, 3]) // RESULTS
//     reject('there was error') // ERROR
//   }, 2000)
// })
//
// doWorkPromise
// .then( (result) => {
//   console.log('Success', result);
// })
// .catch( (error) => {
//   console.log('Error', error);
// })

//
//
//                                fulfilled
//                                /
//  Promise       -- pending -->
//                                \
//                                rejected
//
//

const add = (a, b) => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(a + b)
      reject('there was error')
    }, 2000)
  })
}

// THIS IS CALLBACK HELL ////////////////////////////////
// BAD ///////////////////////////////

// add(1, 2)
// .then( (sum) => {
//   console.log(sum);
//
//   add(sum, 5)
//   .then( sum2 => {
//     console.log(sum2);
//   })
//   .catch( e => {
//     console.log(e);
//   })
//
// })
// .catch( (e) => {
//   console.log(e);
// })

// THIS IS PROMISE CHAINING /////////////////////////////////////

add(1, 1)
.then( (sum) => {
  console.log(sum);
  return add(sum, 4)
})
.then((sum2) => {
  console.log(sum2);
})
.catch( (e) => {
  console.log(e);
})
