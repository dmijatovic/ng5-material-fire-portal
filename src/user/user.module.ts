//angular
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//material modules - already added in main.module?!?
import { AppMateralModule } from '../material/material.module';

/**
 * FIREBASE SECTION - already imported in main.module.ts
 */
//firebase modules
//import { FireModule } from '../firebase/fire.module';
//NOTE that loginSvc provider is defined at
//HIGHEST level in main.module so it can be
//shared between app and user modules
//import { LoginSvc } from '../firebase/login.svc'

//get environment for connection to server
import { environment as env } from '../environments/environment';

//local app
import {
  UserInputForm, UserLogin, UserRegister, UserVerifyEmail,
  UserResetPassword, UserChangeEmail, UserCreateProfile,
  UserRemoveAccount, UserLogout
} from './index';

//firebase service

//import { SystemErrorModule } from '../system/error.module';
import { SystemComponentsModule } from '../system/util.module';

//-----------------------------------
//ROUTES
//-----------------------------------

const routes: Routes = [{
  path: 'login',
  component: UserLogin
},{
  path: 'logout',
  component: UserLogout
},{
  path: 'register',
  component: UserRegister
},{
  path: 'password',
  component: UserResetPassword
},{
  path: 'verify',
  component: UserVerifyEmail,
  //canActivate:[LoginSvc]
},{
  path: 'email',
  component: UserChangeEmail,
  //canActivate:[LoginSvc]
},{
  path: 'remove',
  component: UserRemoveAccount,
  //canActivate:[LoginSvc]
},{
  path: 'profile',
  component: UserCreateProfile,
  //canActivate: [LoginSvc]
},{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
}]


@NgModule({
  declarations: [
    UserInputForm,
    UserLogin,UserLogout,
    UserRegister,
    UserVerifyEmail,
    UserResetPassword,
    UserChangeEmail,
    UserRemoveAccount,
    UserCreateProfile
  ],
  imports: [
    //BrowserModule,
    //BrowserAnimationsModule,
    CommonModule, FormsModule, ReactiveFormsModule,
    AppMateralModule,//FireModule,
    SystemComponentsModule,
    RouterModule.forChild(routes)
  ],
  //providers: [LoginSvc],
  exports: [
    UserInputForm,
    UserLogin,UserLogout,
    UserRegister,
    UserVerifyEmail,
    UserResetPassword,
    UserChangeEmail,
    UserRemoveAccount,
    UserCreateProfile
  ],
  //bootstrap: [LoginComponent]
})
export class UserModule {
  constructor() {
    //debugger
    //console.log("Login module loaded");
  }
}
