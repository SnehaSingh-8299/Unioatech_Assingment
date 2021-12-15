const Joi = require("joi").defaults((schema) => {
    switch (schema.type) {
        case "string":
            return schema.replace(/\s+/, " ");
        default:
            return schema;
    }
});

Joi.objectId = () => Joi.string().pattern(/^[0-9a-f]{24}$/, "valid ObjectId");

module.exports.identify = Joi.object({
    id: Joi.objectId().required(),
});

module.exports.uploadImage = Joi.object({
    nameOfPerson: Joi.string().required(),
    latitute : Joi.string().optional(),
    longitude : Joi.string().optional()
})
