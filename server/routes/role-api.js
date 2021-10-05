/**
 * * Title: role-api.js
 * Author: James Pinson
 * Date: 09/29/21
 * Description: This is the role apis. 
 */

//This is the require statements for this file. 
const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

//This is the findAll users api. 
router.get('/', async (req, res) => {
    try
    {
        //Here we find the roles where isDisabled is set to false. 
        Role.find({})
        .where('isDisabled')
        .equals(false)
        .exec(function(err, roles)
        {
            //Here we log any mongodb errors. 
            if (err) 
            {
                console.log(err);
                const findAllRolesMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
            }
            //Here is we respond that the query was successful.
            else
            {
                console.log(roles);
                const findAllRolesResponse = new BaseResponse('200', 'Query successful', roles);
                res.json(findAllRolesResponse.toObject());
            }
        })
    }
    //Here we add the catch for any node.js server errors. 
    catch (e)
    {
        console.log(e);
        const findAllRolesCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(findAllRolesCatchErrorResponse.toObject());
    }
});

//FindById
router.get('/:roleId', async(req, res) => {
    try
    {
        //We do a findOne function searching for the roleId. 
        Role.findOne({'_id': req.params.roleId}, function(err, role)
        {
            //If there is a mongodb error we log the error. 
            if (err)
            {
                console.log(err);
                const findRoleByIdMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
            }
            //If the query is successful we return the role and log our base response. 
            else
            {
                console.log(role);
                const findRoleByIdResponse = new BaseResponse('200', 'Query successful', role);
                res.json(findRoleByIdResponse.toObject());
            }
        })
    }
    //Here we add the catch for any node.js internal server errors. 
    catch (e)
    {
        console.log(e);
        const findRoleByIdCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
    }
});

//This is the create role api. 

router.post('/', async (req, res) => {
 try
 {
     //We use a find one passing text as the parameter. 
    Role.findOne({'text': req.body.text}, function(err, role) {
        //If there is a mongo db error we log the error. 
    if (err) {
        console.log(err);
        const findRoleMongodbError = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findRoleMongodbError.toObject());
    }
    else {
        console.log(role);

        //If that role doesn't already exist we create the new role. 
        if (!role) {

            //This creates the new role variable with the variable text. 
            const newRole = {
                text: req.body.text
            }

            //Here we use the create function to create the new role. 
            Role.create(newRole, function(err, role)
            {
                //If there is a mongo db error we log the response. 
                if (err)
                {
                    console.log(err);
                    const createRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                    res.status(500).send(createRoleMongodbErrorResponse.toObject());
                }
                //If it is successful we return the new role and log the response. 
                else
                {
                    console.log(role);
                    const createRoleResponse = new BaseResponse('200', 'Query successful', role);
                    res.json(createRoleResponse.toObject());
                }
            })
            //If the role already exist we return the message to the user. 
        } else {
            console.log(`Role: ${req.body.text} already exists`);
            const roleAlreadyExists = new ErrorResponse(400, `Role '${req.body.text}' already exists.`);
            res.status(400).send(roleAlreadyExists.toObject());
        }
    }
})
}
//Here we have the catch block for any node.js internal server errors. 
catch (e)
{
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createRoleCatchErrorResponse.toObject());
}
});

//This is the updateRole api

router.put('/:roleId', async(req, res) => {
    try
    {
        //Here we use the findOne to find the role by the id. 
        Role.findOne({'_id': req.params.roleId}, function(err, role)
        {
            //If there is a mongo db error we log it. 
            if (err)
            {
                console.log(err);
                const updateRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(updateRoleMongodbErrorResponse.toObject());
            }
            else
            {
                //We return the role to our console log. 
                console.log(role);

                //Here we set the role variable which is text and required. 
                role.set({
                    text: req.body.text
                });

                //Here we create the save function for the updated role. 
                role.save(function(err, updatedRole)
                {
                    //If there is a mongo db server error we log it. 
                    if (err)
                    {
                        console.log(err);
                        const updatedRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                        res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                    }
                    //If the query is successful we return the updated role and log the response. 
                    else
                    {
                        console.log(updatedRole);
                        const updatedRoleResponse = new BaseResponse('200', 'Query successful', updatedRole);
                        res.json(updatedRoleResponse.toObject());
                    }
                })

            }
        })
    }
    //Here we have the catch block for any node.js internal server errors. 
    catch (e)
    {
        console.log(e);
        const updateRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(updateRoleCatchErrorResponse.toObject());
    }
});

//This is the delete role api. 
router.delete('/:roleId', async (req, res) => {
    try
    {
        //Here we have the findOne function by id. 
        Role.findOne({'_id': req.params.roleId}, function(err, role)
        {
            //If there is a mongo db server error we log it. 
            if(err)
            {
                console.log(err);
                const deleteRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
            }
            else
            {
                //We log the role to our console. 
                console.log(role);

                //Here we use the aggregate query to see if the role is assigned to any users currently. 
                User.aggregate(
                    [
                        {
                            //This finds the roles for the users. 
                            $lookup:
                            {
                                from: 'roles',
                                localField: 'role.role',
                                foreignField: 'text',
                                as: 'userRoles'
                            }
                        },
                        {
                            //If the role we are deleting matches any current userRoles then that means the role is actively assigned to a user. 
                            $match:
                            {
                                'userRoles.text': role.text
                            }
                        }
                    ], function(err, users)
                    {
                        //Here we log the users. 
                        console.log(users);

                        //If there is a mongo db error we log it. 
                        if (err)
                        {
                            console.log(err);
                            const usersMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                            res.status(500).send(usersMongodbErrorResponse.toObject());
                        }
                        else
                        {
                            //If users are assigned to that role we return the message that the role is in use. 
                            if (users.length > 0)
                            {
                                console.log(`Role <${role.text}> is already in use and cannot be deleted`);
                                const userRoleAlreadyInUseResponse = new BaseResponse(400, `Role '${role.text}' is in use.`, role);
                                res.status(400).send((userRoleAlreadyInUseResponse.toObject()));
                            }
                            //If not we return the message that it is not active and can be removed. 
                            else
                            {
                                console.log(`Role <${role.text}> is not an active role and can be safely removed`);

                                //We set the role to disabled. 
                                role.set({
                                    isDisabled: true
                                });

                                //We save the updated role. 
                                role.save(function(err,updatedRole)
                                {
                                    //If there is a mongodb error we log it. 
                                    if (err)
                                    {
                                        console.log(err);
                                        const updatedRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                                        res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                                    }
                                    //If not we return the message that the role has been removed. 
                                    else
                                    {
                                        console.log(updatedRole);
                                        const roleDeletedResponse = new BaseResponse('200', `Role '${role.text}' has been removed successfully`, updatedRole);
                                        res.json(roleDeletedResponse.toObject());
                                    }
                                })
                            }
                        }
                    })
            }
        })
    }
    //This is the catch block for any node.js internal server errors. 
    catch (e)
    {
        console.log(e);
        const deleteRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(deleteRoleCatchErrorResponse.toObject());
    }
});

module.exports = router;
