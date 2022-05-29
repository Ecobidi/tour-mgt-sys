const router = require('express').Router()
const multer = require('multer')

const TourController = require('../controllers/tour-package')
const UserController = require('../controllers/user')

const upload = multer({})

router.get('/', TourController.getTourPackages)

router.get('/new', TourController.createTourPackagePage)

router.post('/new', upload.single('tour_featured_image'), TourController.createTourPackage)

router.get('/update/:serial_number', TourController.editTourPackagePage)

router.post('/update/:serial_number', upload.single('tour_featured_image'), TourController.editTourPackage)

router.get('/remove/:tour_id', UserController.hasAdminAuthorization, TourController.removeTour)

module.exports = router