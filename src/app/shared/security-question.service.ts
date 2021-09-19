/**
 * * Title: security-question-list.component.ts
 * Author: Larry
 * Date: 09/19/21
 * Description: Security question list angular code
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

  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

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

/**
 * Angular delete questions modified by Larry
 * @param questionId 
 * @returns 
 */
  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/security-questions/' + questionId)
  }
}
