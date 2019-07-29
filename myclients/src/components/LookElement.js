import moment from "moment";


export default class LookElement {
    constructor(_id, description, lookPic, timestamp) {
        this._id = _id
        this.description = description;
        this.lookPic = lookPic
        this.timestamp = moment(timestamp).format("DD/MM/Y hh:mm:ss")
    }
}