const express = require('express');
const router = express.Router();
var models = require('./models');

/*

    GET -   [All]               /properties
    GET -   [One / Subset]      /properties/:id
    POST -  [Update One]        /properties/:id
    PUT -   [Delete One]        /properties/:id

*/

// GET - list of all properties in database
router.get('/properties', (req,res,next) => {
    console.log("API: Get All Properties")
    let query = models.PropertyModel.find({});
    query.select('address');
    query.exec(function(err, propertyDetails) {
        if(err) return next(err);
        return res.json(propertyDetails);
    });
});

// GET - all bills
router.get('/property/bills', (req,res,next) => {
    let query = models.PropertyOutgoingsModel.find({});
    query.exec(function(err, propertyDetails) {
        if(err) return next(err);
        return res.json(propertyDetails);
    });
});

// GET - detailed bills - full and subset
router.get('/property/detailbills/:bill/:startDate/:endDate', (req,res,next) => {
    console.log("API: Get Summary Table Bills")
    let bill = req.params.bill;
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    let propertyGroup = bill.split("=")[0];
    let propertyName = bill.split("=")[1];
    let query = "";
    console.log(bill, startDate, endDate, propertyName, propertyGroup)
    if (startDate == 0) { 
        startDate = '1900-01-01'; 
        endDate =  new Date().toISOString().substr(0, 10);
     };
    if (propertyGroup=="all") {
        query = models.PropertyOutgoingsModel.find({
            dueDate: {$gte: startDate, $lte: endDate}
        });
    } else {
        query = models.PropertyOutgoingsModel.find({
            dueDate: {$gte: startDate, $lte: endDate}, property: propertyName
        });
        
    }
    query.exec(function(err, propertyDetails) {
        if(err) return next(err);
        return res.json(propertyDetails);
    });
});



// GET - aggregated bills - full and subset
router.get('/property/aggbills/:bill/:startDate/:endDate', (req,res,next) => {
    console.log("API: Get Property Graph Bills")
    let bill = req.params.bill;
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    let propertyGroup = bill.split("=")[0];
    let propertyName = bill.split("=")[1];
    let query = "";

    if (startDate == 0) { 
        startDate = '1900-01-01'; 
        endDate =  new Date().toISOString().substr(0, 10);
     };

    if (propertyGroup == "all") {
        query = models.PropertyOutgoingsModel.aggregate([
            { $match: { dueDate: { $gte: startDate, $lte: endDate } }},
            { $group: {
                _id: "$category", 
                value: { $sum: "$amount" }
            }}
        ]);
    } else if (propertyGroup == "property") {
        query = models.PropertyOutgoingsModel.aggregate([
            { $match: { $and: [ { dueDate: { $gte: startDate, $lte: endDate } }, { property: { $eq: propertyName } } ] } },
            { $group: {
                _id: "$category", 
                value: { $sum: "$amount" }
            }}
        ]);
    } 

    query.exec(function(err, propertyDetails) {
        if(err) {
            return err;
        }
        return res.json(propertyDetails);
    });
});

// POST - Enter bill for a specified property
router.post('/property/bill', (req, res, next) => {
    console.log("API: Post - New Bill");
    let data = req.body;
    req.body.amount = parseInt(req.body.amount);
    console.log(data);

    var bill = new models.PropertyOutgoingsModel(data);
    bill.save(function(err) {
        if (err) {
            console.log("Error");
            console.log(err);
            return;
        }
        console.log("Success!");
    });

});

// POST - Enter new property 
router.post('/property/add', (req, res, next) => {
    console.log("API: Post - New Property");
    let data = req.body;
    console.log(data);

    var property = new models.PropertyModel(data);
    bill.save(function(err) {
        if (err) {
            console.log("Error");
            console.log(err);
            return;
        }
        console.log("New Property addded successfully.");
    });

})

// GET - details of a given property 
router.get('/properties/:addr', (req, res, next) => {
    let addr = req.params.addr;
    console.log("API: Get Selected Property Details");
    console.log(addr);
    let query = models.PropertyModel.findOne({address : addr});
    query.select('address city country postcode');
    query.exec(function(err, propertyDetails) {
        if (err) return next(err); 
        return res.json(propertyDetails);
    });
});

// --------------------- POSTS ------------------------------------
router.delete('/property/removeBill/:id', (req, res, next) => {
    let bill = req.params.id;
    console.log("API: Delete Bill");
    let query = models.PropertyOutgoingsModel.remove({_id: bill});
    query.exec(function(err, propertyDetails) {
        if (err) return next(err); 
        return res.json(propertyDetails);
    });
});

module.exports = router; 

