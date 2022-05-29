const BookingService = require('../services/booking')

class BookingController {

  static async getBookingsPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || BookingService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let bookings, totalDocuments
    if (search) {
      bookings = await BookingService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await BookingService.countMatchingDocuments(search)
    } else {
      bookings = await BookingService.findAll({limit: limit_size, offset})
      totalDocuments = await BookingService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('bookings', { bookings, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async confirmBooking(req, res) {
    
  }

  static async removeBooking(req, res) {
    try {
      await BookingService.removeOne(req.params.booking_id)
      req.flash('success_msg', 'Booking removed')
      res.redirect('/admin/admin/bookings')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/admin/bookings')
    }
  }

}

module.exports = BookingController