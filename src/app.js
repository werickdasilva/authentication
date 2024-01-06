import express from 'express'
import { PORT } from './constants.js'
import bodyParser from 'body-parser'
import { authRouter } from './routers/auth.router.js'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', authRouter)

app.listen(PORT, () => console.log(`Server running in port ${PORT}`) )
