const router = require('express').Router()
const ClientController = require('../controllers/client-controller')

// const checkAuthentication = (req, res, next) => {
//   if (req.session.student) next() 
//   else res.redirect('/student/login')
// }

// router.get('/login', ClientController.getLoginPage)

// router.post('/login', ClientController.handleLogin)

// router.get('/logout', ClientController.handleLogout)

// router.use(checkAuthentication)

router.get('/', ClientController.getHomePage)

router.get('/tour-packages/:tour_id', ClientController.getTourDetails)

router.post('/book-tour', ClientController.handleTourBooking)

router.get('/make-enquiry', ClientController.getEnquiryPage)

router.post('/send-enquiry', ClientController.processSendEnquiry)

module.exports = router