/*
============================================
; Title:  Bob's Computer Repair Shop
; Author: Grayton Savickas
; Date:   18 Sep 2021
; Description: App module
;===========================================
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';
import { MatCardModule} from '@angular/material/card';
import { InvoiceComponent } from './pages/invoice/invoice.component';



import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResetPasswordFormComponent } from './shared/forms/reset-password-form/reset-password-form.component';
import { VerifyUsernameFormComponent } from './shared/forms/verify-username-form/verify-username-form.component';
import { VerifySecurityQuestionFormComponent } from './shared/forms/verify-security-question-form/verify-security-question-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MatStepperModule } from '@angular/material/stepper';
import { ErrorInterceptor } from './shared/error.interceptor';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ErrorComponent } from './pages/error/error.component';
import { ContactUsComponent  } from './pages/contact-us/contact-us.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { TableModule } from 'primeng/table';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { InvoiceSummaryDialogComponent } from './shared/invoice-summary-dialog/invoice-summary-dialog.component'; 
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    SigninComponent,
    DeleteRecordDialogComponent,
    ResetPasswordFormComponent,
    VerifyUsernameFormComponent,
    VerifySecurityQuestionFormComponent,
    RegisterComponent,
    NotFoundComponent,
    AboutUsComponent,
    ErrorComponent,
    ContactUsComponent,
    InvoiceComponent,
 
    RoleListComponent,
    RoleCreateComponent,
    RoleDetailsComponent,
    InvoiceSummaryDialogComponent,
    PurchasesByServiceGraphComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatTableModule,
    DragDropModule,
    MessageModule,
    MessagesModule,
    MatStepperModule,
    MatListModule,
    MatSelectModule,
    TableModule,
    ChartModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }