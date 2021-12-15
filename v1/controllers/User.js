const _ = require("lodash");
const Model = require("../../models");
const Validation = require("../validations");
const constants = require("../../common/constants");
const Auth = require("../../common/authenticate");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');
const fs = require("fs");


module.exports.getAllImage = async (req, res, next) => {
  try {
    let criteria = {
      isDeleted: false
    }
    let skip = parseInt(req.query.page - 1) || 0;
    let limit = parseInt(req.query.limit) || 10;
    skip = skip * limit;
    let sort = {
      createdAt: -1
    }
    if(req.query.filter){
      req.query.filter = req.query.filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      criteria.name = {
        $regex : req.query.filter,
        $options: 'i'
      }
    }
    const doc = await Model.ImageModel.find(criteria).limit(limit).skip(skip).sort(sort);
    const count = await Model.ImageModel.countDocuments(criteria)
    return res.success("DATA_FETCHED", {doc, count});
  } catch (error) {
    next(error);
  }
};

module.exports.getImageById = async (req, res, next) => {
  try {
    let criteria = {
      _id: ObjectId(req.query.imageId)
    }
    if (!req.query.imageId) {
      throw new Error("Please provide image Id");
    }
    const doc = await Model.ImageModel.findOne(criteria);
    return res.success("DATA_FETCHED", doc);
  } catch (error) {
    next(error);
  }
};
