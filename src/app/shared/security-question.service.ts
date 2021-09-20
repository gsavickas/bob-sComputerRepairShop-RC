/**
 * * Title: security-question.service.ts
 * Author: Larry , James Pinson 
 * Date: 09/19/21
 * Description: Security question service file. 
 */

import { Injectable } from '@angular/core';
import { SecurityQuestion } from './security-question.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {

  constructor(private http: HttpClient) { }

  //This creates the function for find all security questions. 
  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  //This creates the function for find security questions by Id. 
  findSecurityQuestionById(questionId: string): Observable<any> {
    return this.http.get('/api/security-questions/' + questionId);
  }

/**
 * Angular create questions modified by Larry
 * @param questionId 
 * @returns 
 */
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text
    })
  }

  updateSecurityQuestion(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.put('/api/security-questions/' + questionId, {
      text: updatedSecurityQuestion.text
    })
  }

/**
 * Angular delete questions modified by Larry
 * @param questionId 
 * @returns 
 */
  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/security-questions/' + questionId)
  }
}
