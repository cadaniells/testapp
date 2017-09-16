'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// -------- Property Details ---------  

var PropertySchema = new Schema({
    address: {type: String, required: true}, 
    city: {type: String, required: true }, 
    country: {type: String, required: true },
    postcode: {type: String, required: true }
});


PropertySchema.pre('save', function(next) {
    var user = this;
    console.log("Pre Save");
});

var PropertyModel = mongoose.model('Property', PropertySchema);


// ---------- Property Outgoings ---------------

var PropertyOutgoingsSchema = new Schema({
    property: {type: String, required: true},
    category: {type: String, required: true},
    company: {type: String, required: true },
    amount: {type: Number, required: true},
    dueDate: {type: String, required: true},
    invoiceDate: {type: String, required: true},
    taxType: {type: String, required: true},
    frequency: {type: String, required: true}
});

var PropertyOutgoingsModel = mongoose.model('PropertyOutgoings', PropertyOutgoingsSchema);


// exports 
module.exports = {
    PropertyModel: PropertyModel,
    PropertyOutgoingsModel: PropertyOutgoingsModel
};