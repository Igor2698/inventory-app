import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
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
const JWT_SECRET = process.env.JWT_SECRET || 'inventory_secret'
const JWT_EXPIRES_IN = '12h'

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: token is missing' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    return next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized: invalid token' })
  }
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  if (username !== 'admin' || password !== 'admin123') {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  return res.json({ token, user: { username, role: 'admin' } })
})

app.get('/api/orders', verifyJwt, (_, res) => {
  res.json(orderState)
})

app.get('/api/products', verifyJwt, (_, res) => {
  res.json(productState)
})

app.delete('/api/orders/:id', verifyJwt, (req, res) => {
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
