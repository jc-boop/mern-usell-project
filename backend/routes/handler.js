const { request } = require('express');
const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

router.get('/listings/', async (request, response) => {
    const listings = Schemas.Listings;
    let sortby = '';
    let ascdesc = 1;
    if (request.query.sortBy) {
        const str = request.query.sortBy.split(':');
        sortby = str[0];
        ascdesc = (str[1] === 'desc') ? -1 : 1
    }
    if (request.query.search) {
        const regex = new RegExp(regexEsc(request.query.search), 'gi');
        if (request.query.sortBy)
        {
            if (sortby === 'category') {
                    listings.find({$or:[{'listing_title': regex},{'listing_description': regex},{'listing_category': regex}]}).sort({listing_category: ascdesc}).exec((err, listResults) => {
                    if (err) {
                        throw err;
                    } else {
                        response.end(JSON.stringify(listResults));
                    }
                    });
                } else{
                    listings.find({$or:[{'listing_title': regex},{'listing_description': regex},{'listing_category': regex}]}).sort({date_posted: ascdesc}).exec((err, listResults) => {
                        if (err) {
                            throw err;
                        } else {
                            response.end(JSON.stringify(listResults));
                        }
                    });
                }
        }
        else {
            listings.find({$or:[{'listing_title': regex},{'listing_description': regex},{'listing_category': regex}]}).exec((err, listResults) => {
            if (err) {
                throw err;
            } else {
                response.end(JSON.stringify(listResults));
            }
            });
        }        
    }
    else {
        if (request.query.sortBy) {
            if (sortby === 'category') {
                    listings.find({}).sort({listing_category: ascdesc}).exec((err, listResults) => {
                    if (err) {
                        throw err;
                    } else {
                        response.end(JSON.stringify(listResults));
                    }
                    });
                } else{
                    listings.find({}).sort({date_posted: ascdesc}).exec((err, listResults) => {
                    if (err) {
                        throw err;
                    } else {
                        response.end(JSON.stringify(listResults));
                        }
                    });
                }
        }
        else
        {
            listings.find({}).exec((err, listResults) => {
            if (err) throw err;
            if (listResults) {
                response.end(JSON.stringify(listResults));
            } else {
                response.end();
            }
            });
        }
        
    }
});

router.get('/listings/:listingId', async (request, response) => {
    console.log(request)
    const listings = Schemas.Listings;
    const objId = request.params.listingId;
    const this_listing = await listings.find({"_id" : ObjectId(objId)}).exec((err, listingData) => {
        if (err) throw err;
        if (listingData) {
            response.end(JSON.stringify(listingData));
        } else {
            response.end();
        }
    });
});

router.put('/addComment/:listingId', async (request, response) => {
    const listings = Schemas.Listings;
    const objId = request.params.listingId;
    const this_listing = await listings.updateOne({"_id" : ObjectId(objId)},{$push: {listing_comments: {name: request.body.name, comment: request.body.comment, date: request.body.date} }}).exec((err, listingData) => {
        if (err) throw err;
        if (listingData) {
            console.log(listingData)
            response.end(JSON.stringify(listingData));
        } 
        else {
            response.end();
        }
    });
});

router.post('/delete/:listingId', async (request, response) => {
    const listings = Schemas.Listings;
    const objId = request.params.listingId;
    listings.findById(ObjectId(objId), function (err, docs) {
        if (err) throw err;
        if (docs) {
            if (request.body.password === docs.listing_password) {
                var path = docs.listing_img
                const newpath = path.replace("http://localhost:4000", "./public")
                listings.findByIdAndRemove(ObjectId(objId), function(err, docs) {
                    if (err) throw err;
                    if (docs) {
                        try {
                            fs.unlinkSync(newpath)
                        } 
                        catch(err) {
                            console.error(err)
                        }
                        console.log("Successfully Deleted!");
                    }
                    else{
                        console.log(err)
                    }
                });
            }
            else {
                response.end()
            }
        } 
        else {
            console.log(err)
        }
    });
});

router.put('/edit/:listingId', async (request, response) => {
    const listings = Schemas.Listings;
    const objId = request.params.listingId;
    listings.findById(ObjectId(objId), function (err, docs) {
        if (err) throw err;
        if (docs) {
            if (request.body.password === docs.listing_password) {
                listings.findByIdAndUpdate(ObjectId(objId), {
                    listing_title: request.body.title,
                    listing_price: request.body.price,
                    listing_category: request.body.category,
                    listing_description: request.body.description
                }, function(err, docs) {
                    if (err) throw err;
                    if (docs) {
                        console.log("Successfully Updated");
                    }
                    else{
                        console.log(err)
                    }
                });
            }
            else {
                response.end()
            }
        } 
        else {
            console.log(err)
        }
    });
});

router.post('/addListing', async (request, response)=> {
    const temp_img = request.files.img
    const temp_date = Date.now()
    const newListing = new Schemas.Listings({
        listing_title: request.body.title,
        listing_price: request.body.price,
        listing_category: request.body.category,
        listing_description: request.body.description,
        listing_password: request.body.password,
        listing_img: 'http://localhost:4000/uploads/images/img_' + temp_date + '_' + temp_img.name
    })
    try{
        newListing.save((err, data)=>{
            if (err) {
                response.end('Error Saving.');
            }
            else {
                temp_img.mv('./public/uploads/images/img_'+ temp_date + '_' + temp_img.name)
            }
            response.redirect('/');
            response.end();
        });
    } catch(err){
        console.log(err);
        response.redirect('/');
        response.end();
    }  
})

function regexEsc(txt) {
    return txt.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
