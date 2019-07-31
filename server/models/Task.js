const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  description: String,
  favourited: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
const Model = mongoose.model('Task', schemaName);
module.exports = Model;