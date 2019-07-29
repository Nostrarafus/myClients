import moment from "moment";

export default class InfoElement {
  constructor(_id, description, timestamp) {
    this._id = _id
    this.description = description;
    this.timestamp = moment(timestamp).format("DD/MM/Y hh:mm:ss")
  }
}