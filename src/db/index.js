const { connection, connect } = require('mongoose')

const initDb = async () => {
  try {
    await connectToMongoDB()
  } catch (err) {
    connection.close()
    throw new Error(`Fail to connect db ${err}`) 
  }
}

const connectToMongoDB = async () => {
  await connect(process.env.DB_CONNECT_DEV , { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
  })
}

initDb();