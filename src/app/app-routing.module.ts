/*
============================================
; Title:  Bob's Computer Repair Shop
; Author: Grayton Savickas
; Date:   18 Sep 2021
; Description: App module
;===========================================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { UserListComponent} from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent} from './pages/signin/signin.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
