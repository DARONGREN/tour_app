import Booking from '../models/Booking.js'

// create booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body)
  try {
    const savedBooking = await newBooking.save()
    res
      .status(200)
      .json({ success: true, message: 'succesfully book', data: savedBooking })
  } catch (err) {
    res.status(500).json({ success: false, message: 'fail book' })
  }
}

// get booking info
export const getBooking = async (req, res) => {
  const id = req.params.id

  try {
    const book = await Booking.findById(id)
    res
      .status(200)
      .json({ success: true, message: 'succesfully get book', data: book })
  } catch (err) {
    res.status(404).json({ success: false, message: 'fail get book' })
  }
}

// get all booking info
export const getAllBooking = async (req, res) => {
  try {
    const book = await Booking.find()
    res
      .status(200)
      .json({ success: true, message: 'succesfully get all book', data: book })
  } catch (err) {
    res.status(500).json({ success: false, message: 'fail get all book' })
  }
}
