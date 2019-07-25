const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const looksSchema = new Schema({
  lookDescription: String,
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  picture: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Looks = mongoose.model('Looks', looksSchema);
module.exports = Looks;