const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let TouristSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  fullname: {
    type: String,
  },
  phone: String,
  
}, {timestamps: {createdAt: true}})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

TouristSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("tourists_id")
  }
  next()
})

module.exports = mongoose.model('tourist', TouristSchema)
