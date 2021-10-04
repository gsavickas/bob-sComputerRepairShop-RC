/*
============================================
; Title:  Bob's Computer Repair Shop
; Author: Grayton Savickas, James Pinson
; Date:   25 Sep 2021
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
import { RegisterComponent } from './pages/register/register.component';
import { VerifyUsernameFormComponent } from '../app/shared/forms/verify-username-form/verify-username-form.component';
import { VerifySecurityQuestionFormComponent } from './shared/forms/verify-security-question-form/verify-security-question-form.component';
import { ResetPasswordFormComponent } from '../app/shared/forms/reset-password-form/reset-password-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ErrorComponent } from './pages/error/error.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { ServicesComponent } from './pages/services/services.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { RoleGuard } from './shared/role.guard';
import {MatCheckboxModule} from '@angular/material/checkbox' 

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
        path: 'purchases-by-service-graph',
        component: PurchasesByServiceGraphComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path:"contact-us",
        component: ContactUsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        canActivate: [AuthGuard]
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

      {
        path: 'services',
        component: ServicesComponent 
      },

      {
        path: 'roles',
        component: RoleListComponent
      },
      {
        path: 'roles/create/new',
        component: RoleCreateComponent
      },
      {
        path: 'roles/:roleId',
        component: RoleDetailsComponent
      }

    
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
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: VerifyUsernameFormComponent
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionFormComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: '500',
        component: ErrorComponent
      }

    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  },
  {
    path: '**',
    redirectTo: 'session/500'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule, MatCheckboxModule,]
})
export class AppRoutingModule { }