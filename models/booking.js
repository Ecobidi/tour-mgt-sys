const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let BookingSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  tour_package_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'tour_package'
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
  is_cancelled: {
    type: Boolean,
  },
  comment: {
    type: String,
  }
}, {timestamps: {createdAt: true}})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

BookingSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("bookings_id")
  }
  next()
})

module.exports = mongoose.model('booking', BookingSchema)
