const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000;

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`The server running in port${port}`)
})