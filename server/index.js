import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { orders, products } from './data.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' },
})

app.use(cors())
app.use(express.json())

let orderState = [...orders]
let productState = [...products]
let activeSessions = 0

app.get('/api/orders', (_, res) => {
  res.json(orderState)
})

app.get('/api/products', (_, res) => {
  res.json(productState)
})

app.delete('/api/orders/:id', (req, res) => {
  const id = Number(req.params.id)
  orderState = orderState.filter((order) => order.id !== id)
  productState = productState.filter((product) => product.order !== id)
  res.json({ id })
})

io.on('connection', (socket) => {
  activeSessions += 1
  io.emit('sessions:update', activeSessions)

  socket.on('disconnect', () => {
    activeSessions = Math.max(activeSessions - 1, 0)
    io.emit('sessions:update', activeSessions)
  })
})

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
