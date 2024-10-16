const express = require('express')
const dotenv = require('dotenv');  // Corrected this line
dotenv.config();  // Loads environment variables from the .env file
const {connectionDB} = require('./config/database.config')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')

connectionDB()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended : true }))

app.use('/api',require('./router/index'))

app.listen(PORT,()=>{
    console.info(`Server started on port ${PORT}`)
})

module.exports = app




