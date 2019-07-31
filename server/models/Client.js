const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  clientName: String,
  picture: {
    imgName: String,
    imgPath: String,
  },
  looks: [{ type: Schema.Types.ObjectId, ref: "Looks" }],
  infos: [{ type: Schema.Types.ObjectId, ref: "ClientInfo" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;

