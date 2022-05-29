const sharp = require('sharp')
const { streamUpload, removeUploadedFile } = require('../config/cloudinary')

const TourService = require('../services/tour-package')

class TourController {

  static async getTourPackages(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || TourService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let tours, totalDocuments
    
    if (search) {
      tours = await TourService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await TourService.countMatchingDocuments(search)
    } else {
      tours = await TourService.findAll({limit: limit_size, offset})
      totalDocuments = await TourService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('tour-packages', { tours, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async createTourPackagePage(req, res) {
    const packageTypes = ['Couple Package', 'Family Package', 'Group Package', 'Individual Package']
    res.render('tour-packages-new', {packageTypes})
  }

  static async createTourPackage(req, res) {
    let dao = req.body
    try {
      if (req.file) {
        let editedImage = await sharp(req.file.buffer).resize(620, 580).toBuffer()
        const imageInfo = await streamUpload(editedImage, process.env.PROJECT_CLOUDINARY_IMAGE_FOLDER + "/tour-packages")
        dao.tour_featured_image = imageInfo.url
        dao.tour_featured_image_public_id = imageInfo.public_id
      }
      await TourService.create(dao)
      req.flash('success_msg', "Package successfully added")
      res.redirect('/admin/tour-packages')
    } catch (err) {
      console.log(err)
      res.redirect('/admin/tour-packages')
    }
  }

  static async editTourPackagePage(req, res) {
    const packageTypes = ['Couple Package', 'Family Package', 'Group Package', 'Individual Package']
    let serial_number = req.params.serial_number
    let tour = await TourService.findBySerialNumber(serial_number)
    res.render('edit-tour-package', { packageTypes, tour })
  }

  static async editTourPackage(req, res) {
    let dao = req.body
    try {
      let tour = await TourService.findById(dao._id)
      if (req.file) {
        // remove prev image
        tour_featured_image_public_id && await removeUploadedFile(tour_featured_image_public_id)
        let editedImage = await sharp(req.file.buffer).resize(620, 580).toBuffer()
        const imageInfo = await streamUpload(editedImage, process.env.PROJECT_CLOUDINARY_IMAGE_FOLDER + "/tour-packages")
        dao.photo = imageInfo.url
        dao.photo_public_id = imageInfo.public_id
      }
      await TourService.updateOne(dao)
      req.flash('success_msg', "Tour Detail updated")
      res.redirect('/admin/tour-packages')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error processing update')
      res.redirect('/admin/tour-packages')
    }
  }

  // TODO Implement Image Cleanup After Tour Package Removal

  static async removeTour(req, res) {
    try {
      let doc = await TourService.removeOne(req.params.tour_id)
      // remove photo
      if (doc.tour_featured_image_public_id) {
        await removeUploadedFile(doc.tour_featured_image_public_id)  
      }
      req.flash('success_msg', 'Tour Package removed successfully')
      res.redirect('/admin/tour-packages')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/admin/tour-packages')
    }
  }

}

module.exports = TourController