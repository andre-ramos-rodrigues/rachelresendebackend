const router = require('express').Router()
const Contact = require('../models/ContactModel')

router.post('/', async (req,res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })
  try {
    const savedContact = await newContact.save()
    res.status(200).json(`Mensagem recebida de ${savedContact.name}`)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/', async (req,res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })
  try {
    const Users = await Contact.find()
    res.status(200).json(Users)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router