const BookingModel = require('../models/booking')

class DepartmentService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return BookingModel.findById(id).populate('tour_package_id')
  }

  static async findBySerialNumber(serial_number) {
    return BookingModel.findOne({serial_number}).populate('tour_package_id')
  }

  static async searchBy(search = '', { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    let docs = await BookingModel.find({ $or: [{customer_name: pattern}, {customer_email: search}]}).skip(offset).limit(limit).populate('tour_package_id')
    
    return docs
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    return BookingModel.find().skip(offset).limit(limit).populate('tour_package_id')
  }

  static async countMatchingDocuments(search = '') {
    let numberOfDocs
    let pattern = new RegExp(search, 'ig')
    if (search) {
      numberOfDocs = await BookingModel.count({ $or: [{customer_name: pattern}, {customer_email: search}]})
    } else {
      numberOfDocs = await BookingModel.count()
    }
    return numberOfDocs
  }

  static async create(dao) {
    return BookingModel.create(dao)
  }

  static async updateOne(update) {
    return BookingModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(serial_number) {
    return BookingModel.findOneAndDelete({serial_number})
  }

}

module.exports = DepartmentService