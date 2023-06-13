import Tour from '../models/Tour.js'

// create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body)
  try {
    const savedTour = await newTour.save()
    res
      .status(200)
      .json({ success: true, message: 'successfull created', data: savedTour })
  } catch (err) {
    res.status(500).json({ success: false, message: 'fail created' })
  }
}

// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json({
      success: true,
      message: 'successfull updated',
      data: updatedTour,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'failed updated' })
  }
}

// get one tour
export const getTour = async (req, res) => {
  const id = req.params.id
  try {
    const tour = await Tour.findById(id).populate('reviews')
    res.status(200).json({
      success: true,
      message: 'successfull get One',
      data: tour,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'failed to get' })
  }
}

// get all tour
export const getAllTour = async (req, res) => {
  //for page
  const page = parseInt(req.query.page)

  try {
    const tour = await Tour.find()
      .populate('reviews')
      .skip(page * 8)
      .limit(8)
    res.status(200).json({
      success: true,
      message: 'successfull get all',
      data: tour,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'failed to get all' })
  }
}

// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id
  try {
    await Tour.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: 'successfull delete',
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'failed delete' })
  }
}

// get tour by search
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, 'i')
  const distance = parseInt(req.query.distance)
  const maxGroupSize = parseInt(req.query.maxGroupSize)

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews')

    res.status(200).json({
      success: true,
      message: 'successfull get One',
      data: tours,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'fail get search',
    })
  }
}

// get featured tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tour = await Tour.find({ featured: true })
      .populate('reviews')
      .limit(8)
    res.status(200).json({
      success: true,
      message: 'successfull get all',
      data: tour,
    })
  } catch (err) {
    res.status(404).json({ success: false, message: 'failed to get all' })
  }
}

// get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount()
    res.status(200).json({ success: true, data: tourCount })
  } catch (err) {
    res.status(500).json({ success: false, message: 'fail to count' })
  }
}
