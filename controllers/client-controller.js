const TourService = require('../services/tour-package')
const TourModel = require('../models/tour-package')
const TouristService = require('../services/tourist')
const BookingService = require('../services/booking')
const EnquiryService = require('../services/enquiry')

class ClientController {
  static async getHomePage(req, res) {
    let tours = await TourModel.find()
    res.render('client/home', { tours })
  }

  static async getTourDetails(req, res) {
    let tour = await TourService.findBySerialNumber(req.params.tour_id)
    res.render('client/tour-detail', { tour })
  }

  static async handleTourBooking(req, res) {
    let dao = req.body
    try {
      let touristDAO = { fullname: dao.customer_name, email: dao.customer_email, phone: dao.customer_phone }
      // insert tourist
      await TouristService.create(touristDAO)
      // insert booking
      await BookingService.create(dao)
      res.redirect('/')
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  }

  static async getEnquiryPage(req, res) {
    res.render('client/make-enquiry')
  }

  static async processSendEnquiry(req, res) {
    let dao = req.body
    try {
      await EnquiryService.create(dao)
      req.flash('success_msg', 'Enquiry Sent')
      res.redirect('/make-enquiry')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error sending enquiry')
      res.redirect('/make-enquiry')
    }
  }

  // static async getLoginPage(req, res) {
  //   res.render('client/login')
  // }

  // static async handleLogin(req, res) {
  //   let dao = req.body
  //   try {
  //     let customer = await TourService.findByRegNo(dao.reg_no)
  //     if (customer && customer.password == dao.password) {
  //       req.session.customer = customer
  //       res.redirect('/')
  //     } else {
  //       req.flash('error_msg', 'Incorrect Login Details')
  //       res.redirect('/login')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     req.flash('error_msg', 'Something went wrong, try again!')
  //     res.redirect('/login')
  //   }
  // }

  // static async handleLogout(req, res) {
  //   res.session.customer = null
  //   res.redirect('/login')
  // }

}


module.exports = ClientController