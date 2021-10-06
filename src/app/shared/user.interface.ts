/**
 * * Title: user.interface.ts
 * Author: James Pinson
 * Date: 09/18/21
 * Description: This sets up our user interface for the application. 
 */

 import { Role } from "./models/role.interface";
//This exports our User interface to the rest of the application. 
export interface User {
    _id?: string;
    userName?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
    role?: Role;
}