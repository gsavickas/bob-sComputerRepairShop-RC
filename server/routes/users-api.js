/**
 * * Title: users-api.js
 * Author: Larry Ohaka
 * Date: 09/16/21
 * Description: Users API
 */


 const express = require("express");

 const Employee = require("../models/user");
 const router = express.Router();
 const BaseResponse = require('../models/security-question')





  /**
  * deleteUser API
  *  */ 
   router.delete ('/:id', async(req,res) =>{
    try{
 //In this projection it only returns the empId todo and done
      User.findOne({'_id': req.params.id},  function(err, user) {
        //if error internal error response will be returned
        if (err) {
          console.log(err);
          const deleteUserMongodbErrorResponse = new ErrorResponse(500, 'internal Server error', err);
          res.status(500).send(deleteUserMongodbErrorResponse.toObject());
           //if there is no error it wil save selected user
        } else {
          console.log(user);
          user.set({
            isDisabled: true
          });
          user.save(function(err, savedUser){
            if(err) {
              console.log(err);
              const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal Server error', err);
              res.json(savedUserMongodbErrorResponse.toObject());
            } else {
              console.log(savedUser);
              const savedUserResponse = new BaseResponse(200, 'Query successful', savedUser);
              res.json(savedUserResponse.toObject());
            }
          })
        }
      })
    } catch(e){
      console.log(e);
      const deleteUserCatchErrorResponse = new ErrorResponse(500, "internal server error", e.message);
      res.status(500).send(deleteUserCatchErrorResponse.toObject());
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
