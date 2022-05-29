const router = require('express').Router()

const TouristController = require('../controllers/tourist')

router.get('/', TouristController.getTouristsPage)

router.get('/remove/:tourist_id', TouristController.removeTourist)

module.exports = router