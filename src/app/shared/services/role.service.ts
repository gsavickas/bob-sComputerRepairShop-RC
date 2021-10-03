/**
 * * Title: role.service.ts
 * Author: James Pinson
 * Date: 09/29/21
 * Description: This is the role service ts file. 
 */

//Here we call the imports we use for this file. 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.interface';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  //We pass the httpClient in our constructor. 
  constructor(private http: HttpClient) { }

  //This creates the findAllRoles function which calls the findAllRoles api.
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  //This creates the findRoleById function which calls the findRoleById api. 
  findRoleById(roleId: string): Observable<any>{
    return this.http.get(`/api/roles/${roleId}`);
  }

  //This creates the createRole function which calls the createRole api. 
  createRole(role: Role): Observable<any>{
    return this.http.post(`/api/roles`, {
      text: role.text
    });
  }

  //This creates the updateRole function which calls the updateRole api. 
  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.put(`/api/roles/${roleId}`, {
      text: role.text
    });
  }

  //This creates the deleteRole function which calls the deleteRole api. 
    deleteRole(roleId: string): Observable<any> {
      return this.http.delete(`/api/roles/${roleId}`);
  }

  // This finds a particular user's role
  findUserRole(userName: string): Observable<any>{
    return this.http.get(`/api/users/${userName}/role`);
  }

}
