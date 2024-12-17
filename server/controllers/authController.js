import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/User.js'
import { sendVerificationEmail } from '../utils/email.js'
import { createToken } from '../utils/auth.js'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Create verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Create user
    const user = new User({
      name,
      email,
      password,
      verificationToken
    })
    await user.save()

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    // Create JWT
    const token = createToken(user)

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Create JWT
    const token = createToken(user)

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' })
  }
}

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body
    
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    
    const { email, name, picture, sub: googleId } = ticket.getPayload()

    // Find or create user
    let user = await User.findOne({ email })
    
    if (!user) {
      user = new User({
        email,
        name,
        googleId,
        avatar: picture,
        verified: true
      })
      await user.save()
    } else if (!user.googleId) {
      user.googleId = googleId
      user.avatar = picture
      await user.save()
    }

    // Create JWT
    const authToken = createToken(user)

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: authToken
    })
  } catch (error) {
    res.status(500).json({ message: 'Error with Google authentication' })
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ 
      email: decoded.email,
      verificationToken: token
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' })
    }

    user.verified = true
    user.verificationToken = undefined
    await user.save()

    res.json({ message: 'Email verified successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Invalid verification token' })
  }
}