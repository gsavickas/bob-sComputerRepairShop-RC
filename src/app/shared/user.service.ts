/**
 * * Title: user.service.ts
 * Author: James Pinson
 * Date: 09/18/21
 * Description: This sets up the user services for our application.  
 */

//These are the import statements we need for this file. 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})

//Here we export our UserService class. 
export class UserService {

  //We use the httpClient for our http calls. 
  constructor(private http: HttpClient) { }

  //Here we have the find all Users function which returns all the users in our collection. 
  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  //Here we have the find users by Id function which returns users by the id. 
  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId);
  }

  //Here we have the create User function which creates a user with the required fields. 
  createUser(user: User): Observable<any> {
    return this.http.post('/api/users/', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    })
  }

  //Here we have the update user function which updates the user. 
  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('api/users/' + userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    })
  }

  //This is the delete user function which deletes a user by id. 
  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}
