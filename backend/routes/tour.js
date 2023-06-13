import express from 'express'
import {
  createTour,
  updateTour,
  deleteTour,
  getTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from '../controllers/tourController.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// create new tour
router.post('/', verifyAdmin, createTour)

// update new tour
router.put('/:id', verifyAdmin, updateTour)

// delete new tour
router.delete('/:id', verifyAdmin, deleteTour)

// get one tour
router.get('/:id', getTour)

// get all tour
router.get('/', getAllTour)

// get by search
router.get('/search/getTourBySearch', getTourBySearch)

// get by featured
router.get('/search/getFeaturedTours', getFeaturedTour)

// get by count
router.get('/search/getTourCount', getTourCount)

export default router
