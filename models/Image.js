const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const ImageModel = new Schema({
    name: {
        type: String,
        default: ""
    },
    size : {
        type : Number
    },
    height : {
        type : Number
    },
    width : {
        type : Number
    },
    extension : {
        type : String
    },
    nameOfPerson : {
        type : String
    },
    latitute : {
        type: String
    },
    longitude:{
        type: String
    },
    location: {
        type: {
            type: String,
        },
        coordinates: [Number]
    },
    isDeleted : {
        type: Boolean,
        default : false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})
ImageModel.index({
    "location": "2dsphere"
});
const Image = mongoose.model('Image', ImageModel);
module.exports = Image;