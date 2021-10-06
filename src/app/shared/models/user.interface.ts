/**
 * * Title: user.interface.ts
 * Author: Larry Ohaka
 * Date: 09/29/21
 * Description: invoice model
 */


// export interface
export interface User {
    _id?: string;
    userName?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
    role?: Object; 
}