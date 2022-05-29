const TourModel = require('../models/tour-package')

class TourService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return TourModel.findById(id)
  }

  static async findBySerialNumber(serial_number) {
    return TourModel.findOne({serial_number})
  }

  static async searchBy(search = '', { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    let docs = await TourModel.find({ $or: [{tour_name: pattern}, {location: pattern}]}).skip(offset).limit(limit)
    
    return docs
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    return TourModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search = '') {
    let numberOfDocs
    let pattern = new RegExp(search, 'ig')
    if (search) {
      numberOfDocs = await TourModel.count({ $or: [{tour_name: pattern}, {location: pattern}]})
    } else {
      numberOfDocs = await TourModel.count()
    }
    return numberOfDocs
  }

  static async create(dao) {
    return TourModel.create(dao)
  }

  static async updateOne(update) {
    return TourModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(serial_number) {
    return TourModel.findOneAndDelete({serial_number})
  }

}

module.exports = TourService