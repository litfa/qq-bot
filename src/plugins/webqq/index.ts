import express from 'express'
import router from './router'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use( cors({
  origin: 'http://localhost:5173'
}))

app.use(bodyParser.json())

app.use('/api', router)

app.listen(3000)
