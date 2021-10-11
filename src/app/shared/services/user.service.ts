/**
 * Title: user.service.ts
 * Modified By: Grayton Savickas
 * Date: 19 September 2021
 * Description: Provides functions for user api
 */

import { Injectable } from "@angular/core";
import { User } from '../models/user.interface';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    // find all users
    findAllUsers(): Observable<any> {
        return this.http.get('/api/users');
    }

    // find a user by provided id
    findUserById(userId: string): Observable<any> {
        return this.http.get('/api/users/' + userId);
    }

    // create a user with provided fields
    createUser(user: User): Observable<any> {
        return this.http.post('/api/users/', {
            userName: user.userName,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email,
            role: user.role
        })
    }

    // update a particular user 
    updateUser(userId: string, user: User): Observable<any> {
        return this.http.put('/api/users/' + userId, {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email,
            role: user.role
        })
    }

    // delete a provided user by id
    deleteUser(userId: string): Observable<any> {
        return this.http.delete('/api/users/' + userId)
    }

}