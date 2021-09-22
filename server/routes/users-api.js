/**
 * * Title: users-api.js
 * Author: Larry Ohaka, Grayton Savickas
 * Date: 09/16/21
 * Description: Users API
 */


 const express = require("express");

 const Employee = require("../models/user");
 const router = express.Router();
 const BaseResponse = require('../models/security-question');
const { userInfo } = require("os");


/**
 * FindAll
 * Will pull all users from the database where the user is disable(false).
 */
router.get('/', async (req, res) => {
  try{
    userInfo.find({}).where('isDisabled').equals(false).exec(function(err, users){
      if (err){
        console.log(err)
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      } else {
        console.log(users);
        const findAllUsersResponse = new BaseResponse(200, 'Query successful', users);
        res.json(findAllUsersResponse.toObject());
      }
    })
  } catch(e) {
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

  /**
  * deleteUser API
  *  */ 
   router.delete ('/:empId/tasks', async(req,res) =>{
    try{
 //In this projection it only returns the empId todo and done
      Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err,employee){
        if (err){
          console.log(err);
          //if error return this 501 error
          res.status(501).send ({
            'message': 'MongoDB Expectation:' + err.message
          })      
         }
         //if no error return
         else{
           console.log(employee);
           res.json(employee);
           }
      });
    }
    catch(e){
      console.log(e);
      res.status(500).send({
        'message': "internal server error" + e.message
      });
    }
  });




  /**
 * FindById API
 */

router.get('/:id', async(req, res) =>{
  try{
      //calls the findOne function
      Employee.findOne({'_id': req.params.id}, function(err, employee) {
          //if there is an error will return error response
          if (err){
              console.log(err);
              const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
              res.status(500).send(findByIdMongodbErrorResponse.toObject());
          }
          //if there isnt an error it will return security  question selected
          else{
              console.log(employee);
              const findByIdResponse = new BaseResponse(200, 'Query successful', employee);
              res.json(findByIdResponse.toObject());
          }

      })
  } catch(e){
      console.log(e);
      const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

module.exports = router;