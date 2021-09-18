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
  * findAll API
  *  */ 
   router.get ('/:empId/tasks', async(req,res) =>{
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