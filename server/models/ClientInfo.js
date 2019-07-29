const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientInfoSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  info: {
    infoClass: String,
    infoData: Array,
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const ClientInfo = mongoose.model('ClientInfo', ClientInfoSchema);
module.exports = ClientInfo;