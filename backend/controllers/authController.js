import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// user regi
export const register = async (req, res) => {
  try {
    //hashing pw
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    })
    await newUser.save()
    res.status(200).json({ success: true, message: 'regi success' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'regi fail' })
  }
}

// user login
export const login = async (req, res) => {
  const email = req.body.email
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ success: false, message: 'no user' })
    }
    const checkCorrectPW = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!checkCorrectPW) {
      return res
        .status(401)
        .json({ success: false, message: ' error password' })
    }
    const { password, role, ...rest } = user._doc
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15d' }
    )

    // set token in the browser cookie and send the res to client
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        // expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      })
  } catch (err) {
    res.status(500).json({ success: false, message: 'fail login' })
  }
}
