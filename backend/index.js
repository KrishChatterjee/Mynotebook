const connectToMongo=require('./db_connect');
var cors = require('cors')
const express = require('express')



connectToMongo();

//creating express app at port 5000 because at port 3000 react app will run
const app = express()
app.use(cors())
const port = 5000

app.use(express.json())



//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})