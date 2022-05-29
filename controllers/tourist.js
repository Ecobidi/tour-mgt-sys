const TouristService = require('../services/tourist')

class TouristController {

  static async getTouristsPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || TouristService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let tourists, totalDocuments
    if (search) {
      tourists = await TouristService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await TouristService.countMatchingDocuments(search)
    } else {
      tourists = await TouristService.findAll({limit: limit_size, offset})
      totalDocuments = await TouristService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('tourists', {tourists, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async removeTourist(req, res) {
    try {
      await TouristService.removeOne(req.params.tourist_id)
      req.flash('success_msg', 'Tourist removed')
      res.redirect('/admin/tourists')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/admin/tourists')
    }
  }

}

module.exports = TouristController