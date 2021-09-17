/**
 * Title: security-question.interface.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 16 September 2021
 * Description: This sets up the interface for our security questions. 
 */

//This exports our security question interface with the id and text variable. 
export interface SecurityQuestion {
    _id?: string;
    text: string;
}