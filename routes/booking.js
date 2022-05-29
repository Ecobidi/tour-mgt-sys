const router = require('express').Router()

const BookingController = require('../controllers/booking')

router.get('/', BookingController.getBookingsPage)

router.post('/confirmBooking', BookingController.confirmBooking)

router.get('/remove/:booking_id', BookingController.removeBooking)

module.exports = router