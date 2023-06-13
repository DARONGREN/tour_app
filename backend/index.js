import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tour.js'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/booking.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
  origin: true,
  Credentials: true,
}

// database connect
mongoose.set('strictQuery', false)
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('connet to mongo')
  } catch (err) {
    console.log(err)
  }
}

app.get('/', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../frontend/build/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})

// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)

app.listen(port, () => {
  connect()
  console.log('server start on ', port)
})
