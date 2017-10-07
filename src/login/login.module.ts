//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//material modules used
import {
    MatInputModule, MatButtonModule, MatExpansionModule
} from '@angular/material';

//get environment for connection to server
import { environment } from '../environments/environment';

//local app
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { PasswordComponent } from './password.component';

//firebase service
import { LoginSvc } from './login.svc'

//-----------------------------------
//ROUTES
//-----------------------------------
const routes:Routes=[{
    path:'login',
    component: LoginComponent
},{
    path:'register',
    component: RegisterComponent
},{
    path:'password',
    component: PasswordComponent
}]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    MatInputModule,MatButtonModule,
    MatExpansionModule,
    RouterModule.forChild(routes)
  ],
  providers: [ LoginSvc ],
  exports: [LoginComponent,RegisterComponent,
    PasswordComponent]
})
export class LoginModule { }
