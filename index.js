const express = require('express')
const app = express()
const cors = require('cors');
const { apiRouter } = require('./routes');
const port = 4000;

app.use(cors())
app.use(express.json())

app.use('api', apiRouter)

app.listen(port, () => {
    console.log(`The server running in port${port}`)
})