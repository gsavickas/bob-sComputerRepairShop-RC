/**
 * * Title: session-api.js
 * Author: Larry Ohaka
 * Date: 09/18/21
 * Description: CRUD apis for security questions
 */

//require statements
const express = require ('express');
const SecurityQuestion = require('../models/security-question');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

//configurations
const router = express.Router();

/**
 * Find all Api
 */
router.get('/', async(req, res) =>{
    try{
        SecurityQuestion.find({})
        .where('isDisabled')
        .equals(false)
        .exec(function(err, securityQuestions)
        {
            if (err)
            {
                console.log(err);
                const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findAllMongodbErrorResponse.toObject());
            }
            else{
                console.log(securityQuestions);
                const findAllResponse = new BaseResponse(200, 'Query successful', securityQuestions);
                res.json(findAllResponse.toObject());
            }
               
            })
        }
        catch (e)
        {
            console.log(e);
            const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
            res.status(500).send(findAllCatchErrorResponse.toObject());
        }
    
});


/**
 * FindById API
 */

router.get('/:id', async(req, res) =>{
    try{
        //calls the findOne function
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
            //if there is an error will return error response
            if (err){
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            }
            //if there isnt an error it will return security  question selected
            else{
                console.log(securityQuestion);
                const findByIdResponse = new BaseResponse(200, 'Query successful', securityQuestion);
                res.json(findByIdResponse.toObject());
            }

        })
    } catch(e){
        console.log(e);
        const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findByIdCatchErrorResponse.toObject());
    }
});



/**
 * CreateSecurityQuestion API
 */
router.post('/', async(req,res)  =>{
    try{
        let newSecurityQuestion = {
            text: req.body.text
        };
        SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
            if(err){
                console.log(err);
                const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal Server error', err);
                res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
            }
            else{
                console.log(securityQuestion);
                const createSecurityQuestionResponse = BaseResponse(200, 'Query Successful!', securityQuestion);
                res.json(createSecurityQuestionResponse.toObject());
            }
        })
    }
      //catch exceptions of error responses
      catch(e){
        console.log(e);
        const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createSecurityQuestionCatchErrorResponse .toObject());
      }
});






/**
 * DeleteSecurityQuestion API
 */

router.delete('/:id', async (req, res) =>{
    try{
        //Pulls up the record of security questions
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
            //if there is an error it will give this error response
            if (err){
                console.log(err);
                const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
            }
            else{
                console.log(securityQuestion);
                //makes security questions disabled
                securityQuestion.set({
                    isDisabled: true
                });

                securityQuestion.save(function (err, savedSecurityQuestion) {
                    if(err){
                        console.log(err);
                        const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                    }
                    else{
                        console.log(savedSecurityQuestion);
                        const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
                        res.json(deleteSecurityQuestionResponse.toObject());
                    }
                })

            }
        })
    }
    //catch exceptions of error responses
    catch(e){
        console.log(e);
        const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
    }
});
//calls the router in the app.js file
module.exports = router;