const TouristModel = require('../models/tourist')

class TouristService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return TouristModel.findById(id)
  }

  static async findBySerialNumber(serial_number) {
    return TouristModel.findOne({serial_number})
  }

  static async findByEmail(email) {
    return TouristModel.findOne({email})
  }

  static async searchBy(search = '', { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    let docs = await TouristModel.find({ $or: [{other_names: pattern}, {surname: pattern}]}).skip(offset).limit(limit).sort('-_id')
    
    return docs
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    return TouristModel.find().skip(offset).limit(limit).sort('-_id')
  }

  static async countMatchingDocuments(search = '') {
    let numberOfDocs
    let pattern = new RegExp(search, 'ig')
    if (search) {
      numberOfDocs = await TouristModel.count({ $or: [{other_names: pattern}, {surname: pattern}]})
    } else {
      numberOfDocs = await TouristModel.count()
    }
    return numberOfDocs
  }

  static async create(dao) {
    return TouristModel.create(dao)
  }

  static async updateOne(update) {
    return TouristModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(serial_number) {
    return TouristModel.findOneAndDelete({serial_number})
  }

}

module.exports = TouristService