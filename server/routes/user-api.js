/**
 * * Title: users-api.js
 * Author: Larry Ohaka
 * Date: 09/16/21
 * Description: Users API
 */


 const express = require("express");

 const User = require('../models/user');
 const bcrypt = require('bcrypt');
 const Employee = require("../models/user");
 const router = express.Router();
 const BaseResponse = require('../services/base-response');
 const ErrorResponse = require('../services/error-response');
 const UserRoleSchema = require('../schemas/user-role');
const user = require("../models/user");
/**
 const saltRounds = 10;
 */



//-------------------------------FindById api modified by Grayton-------------------------------//
/**
 * FindAll users
 */
router.get('/', async (req, res) => {
  try{
    user.find({}).where('isDisabled').equals(false).exec(function(err, users){
      if (err){
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      }else{
        console.log(users);
        const findAllUsersResponse = new BaseResponse(200, 'Query successful', users);
        res.json(findAllUsersResponse.toObject());
      }
    })
  }
  catch (e) {
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
})


 //-------------------------------FindById api modified by Larry-------------------------------//
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



//-------------------------------createUser api modified by Jimmy-------------------------------//
/**
 * createUser Api
 */
//We have a post request linked to the / route. 
router.post('/', async(req, res) => {
  try {

    //This sets up the hashed password using the bcrypt and sets the default role to standard. 
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    standardRole = {
      role: 'standard'
    }

    //This creates our user object with the required fields. 
    let newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName, 
      phoneNumber: req.body.phoneNumber, 
      address: req.body.address, 
      email: req.body.email, 
      role: standardRole
    };

    //This is our user create function. 
    User.create(newUser, function(err, user) {

      //This returns the error message if there is an error with our Mongo db.
      if (err) {
        console.log(err);
        const createUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(createUserMongodbErrorResponse.toObject());
      } 

      //This returns the user showing that the query was successful. 
      else {
        console.log(user);
        const createUserResponse = new BaseResponse(200, 'Query successful', user);
        res.json(createUserResponse.toObject());
      }
    })

    //This creates the error message for if there was an server error. 
  } catch (e) {
    const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});


//-------------------------------UpdateUser api modified by Jimmy-------------------------------//
/**
 * Update user api
 */
router.put('/:id', async (req, res) => {
  try{
    User.findOne({'_id': req.params.id}, function( err, user){
      if (err) {
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      } 
      else 
      {
        console.log(user);

        user.set({
          firstName: req.body.firstName, 
          lastName: req.body.lastName, 
          phoneNumber: req.body.phoneNumber, 
          address: req.body.address,
          email: req.body.email
        })

        user.save(function(err, savedUser) {
          if (err) {
            console.log(err);
            const saveUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const saveUserResponse = new BaseResponse(200, 'Query successful', savedUser);
            res.json(saveUserResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
});



//-------------------------------deleteUser api modified by Larry-------------------------------//
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

module.exports = router;

