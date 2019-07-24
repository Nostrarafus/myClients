const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clientSchema = new Schema({
  owner:  { type: Schema.Types.ObjectId, ref: "User" },
  clientName: String,
  picture: {
    imgName: String,
    imgPath: String,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
