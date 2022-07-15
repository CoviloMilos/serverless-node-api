const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
mongoose.Promise = global.Promise;

const connection = {}

const dbConnection = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing database connection')
    return
  }

  console.log('=> Using new database connection')

  try {
    await mongoose.connect(process.env.DB)
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection has occured ' + err + ' error')
  })

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection is disconnected')
    process.exit(0)
  })

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection is disconnected due to application termination')
      process.exit(0)
    })
  })

  connection.isConnected = mongoose.connection.readyState
}
module.exports = {
  dbConnection
}
