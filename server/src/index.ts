import express from 'express'
import cors from 'cors'
import http from 'http'
import issRoute from './routes/issRoute'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

app.use('/api', issRoute)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
