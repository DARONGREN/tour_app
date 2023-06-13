import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../controllers/userController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// create new User
router.post('/', createUser)

// update new User
router.put('/:id', verifyUser, updateUser)

// delete new User
router.delete('/:id', verifyUser, deleteUser)

// get one User
router.get('/:id', verifyUser, getUser)

// get all User
router.get('/', verifyAdmin, getAllUser)

export default router
