import moment from "moment";

export default class LookElement {
    constructor(_id, description, timestamp) {
        this._id = _id
        this.description = description;
        this.timestamp = moment(timestamp).format("DD/MM/Y hh:mm:ss")
    }
}