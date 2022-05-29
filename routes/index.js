const router = require('express').Router()

const ClientRouter = require('./client-router')

const EnquiryRouter = require('./enquiry')
const BookingRouter = require('./booking')
const TouristRouter = require('./tourist')
const TourPackageRouter = require('./tour-package')
const UserRouter = require('./user')
const LoginRouter = require('./login')

const getDashboard = (req, res) => {
  res.render('dashboard')
}

router.use(ClientRouter)

router.use('/admin/login', LoginRouter)

router.use((req, res, next) => {
  if (req.session.user) next()
  else res.redirect('/admin/login')
})

router.get('/admin', getDashboard)

router.get('/admin/dashboard', getDashboard)

router.use('/admin/enquiries', EnquiryRouter)

router.use('/admin/bookings', BookingRouter)

router.use('/admin/tourists', TouristRouter)

router.use('/admin/tour-packages', TourPackageRouter)

router.use('/admin/users', UserRouter)

router.use('/admin/logout', (req, res) => {
  req.session.user = null
  res.redirect('/admin/login')
})

module.exports = router