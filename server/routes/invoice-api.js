/**
 * * Title: invoice-api.js
 * Author: Larry Ohaka
 * Date: 09/29/21
 * Description: Invoice API
 */

const Invoice = require('../models/invoice');
const User = require('../models/user');
const ErrorResponse = require("../services/error-response");
const BaseResponse = require('../services/base-response');
const router = require("./security-question-api");


//-------------------------------CreateInvoice API modified by Larry------------------------------//

/**
 * CreateInvoice
 * 
 */

router.post('/:userName', async(req, res) =>{
    try{
        const newInvoice = {
            userName: req.params.userName,
            lineItem: req.params.lineItem,
            partsAmount: req.body.partsAmount,
            labourAmount: req.body.labourAmount,
            lineItemTotal: req.body.lineItemTotal,
            total: req.body.total
        }
        console.log(newInvoice);

        Invoice.create(newInvoice, function(err, invoice)
        {
            if (err){
                console.log(err)
                const createInvoiceMongoErrorResponse = new ErrorResponse('500', "Internal Server error", err);
                res.status(500).send(createInvoiceMongoErrorResponse.toObject());
            }
            else{
                console.log(invoice);
                const createInvoiceResponse = new BaseResponse('200', 'Query successful', invoice);
                res.json(createInvoiceResponse.toObject());
            }

        })
    }
    catch(e)
    {
        console.log(e);
        const createInvoiceCatchErrorResponse = new ErrorResponse('500', "Internal server error", e.message);
        res.status(500).send(createInvoiceCatchErrorResponse.toObject());
    }
});

/**
 * FindPurchaseByService
 */
router.get('/purchases-graph', async(req, res) =>{
    try{
        Invoice.aggregate([
            {
                $unwind: '$lineItems'
            },
            {
                $group:
                {
                    '_id':
                    {
                        'title': '$lineItems.title',
                        'price': '$lineItems.price'
                    },
                    'count':
                    {
                        $sum: 1
                    }
                }
            },
            {
                $sort:
                {
                    '_id.title': 1
                }
            }
        ],  function(err, purchaseGraph)
        {
            if(err)
            {
                console.log(err);
                const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse('500', "internal server error", err);
                res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(purchaseGraph);
                const findPurchasesByServiceGraphResponse = new BaseResponse('200', 'Query successful', purchaseGraph);
                res.json(findPurchasesByServiceGraphResponse.toObject());
            }
        })
        
    }
    catch(e)
    {
        console.log(e);
        const findPurchasesByServiceCatchErrorResponse = new ErrorResponse('500', "Internal server error", e.message);
        res.status(500).send(findPurchasesByServiceCatchErrorResponse.toObject());
    }

});

module.exports = router ;