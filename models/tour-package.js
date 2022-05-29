const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let TourSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  tour_name: {
    type: String,
    required: true,
  },
  tour_type: {
    type: String,
  },
  tour_location: {
    type: String,
  },
  tour_price: {
    type: Number,
  },
  tour_features: {
    type: String,
  },
  tour_description: {
    type: String,
  },
  tour_featured_image: String,
  tour_featured_image_public_id: String,
}, {timestamps: { createdAt: true}})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

TourSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("tour_packages_id")
  }
  next()
})

module.exports = mongoose.model('tour_package', TourSchema)
