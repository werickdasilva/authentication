import express from 'express'
import { PORT } from './constants.js'
import bodyParser from 'body-parser'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(PORT, () => console.log(`Server running in port ${PORT}`) )
