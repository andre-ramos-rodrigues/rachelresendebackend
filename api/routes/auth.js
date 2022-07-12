const router = require('express').Router()
const User = require('../models/User')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

//REGISTER AN USER
router.post('/register', async (req,res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    //encrypting the password
    password: CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD).toString()
  })
  try {
    const savedUser = await newUser.save()
    res.status(200).json(`O usuário foi salvo: ${savedUser}`)
  } catch(err) {
    res.send(500).json(err)
  }
})

router.get('/', async (req,res) => {
  try {
    const users = await User.find()
  res.status(200).json(`ok: ${users}`)
  } catch(err) {
    res.status(500).json(err)
  }
  
})

//LOGIN
router.post('/login', async (req,res) => {
  try{
  const user = await User.findOne({username: req.body.username})
  !user && res.status(401).json('no user found')
  //decrypting the saved password
  const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD)
  const SavedPassword = hashedPassword.toString(CryptoJs.enc.Utf8)
  //matching saved password with inputed login password
  SavedPassword !== req.body.password && res.status(401).json('invalid password')
  //generating a token for successfully loged user
  const accessToken = jwt.sign(
    {
    id: user.id,
    isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET,
    {expiresIn: '3d'}
    )
  const {password, ...others} = user._doc
  res.status(200).json(accessToken)
  } catch(err) {
  res.status(500).json(err)
  }
})

module.exports = router