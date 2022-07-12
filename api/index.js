const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const authRoute = require('./routes/auth')
const contactRoute = require('./routes/contactRoute')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/auth', authRoute)
app.use('/Contact', contactRoute)

mongoose.connect(process.env.DB)
.then(() => console.log('DB conectado'))
.catch((err) => console.log(err))


app.listen(process.env.PORT, () => {
  console.log('conectado')
})