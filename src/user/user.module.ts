//angular
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//material modules
import { AppMateralModule } from '../material/material.module';

/**
 * FIREBASE SECTION 
 */
//firebase modules 
import { FireModule } from '../firebase/fire.module';

//get environment for connection to server
import { environment as env } from '../environments/environment';

//local app
import {
  LoginComponent, VerifyEmailComponent,
  PasswordResetComponent, ChangeEmailComponent,
  RemoveAccountComponent, UserProfilePage,
  LogoutComponent
} from './index';

//firebase service
import { LoginSvc } from '../firebase/login.svc'

//import { SystemErrorModule } from '../system/error.module';
import { SystemComponentsModule } from '../system/util.module';

//-----------------------------------
//ROUTES
//-----------------------------------

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  data: env.cfg.user.login
},{
  path: 'logout',
  component: LogoutComponent,
  data: env.cfg.user.login
},{
  path: 'register',
  component: LoginComponent,
  data: env.cfg.user.register
}, {
  path: 'verify',
  component: VerifyEmailComponent
}, {
  path: 'password',
  component: PasswordResetComponent
}, {
  path: 'email',
  component: ChangeEmailComponent
}, {
  path: 'remove',
  component: RemoveAccountComponent
},{
  path: 'profile',
  component: UserProfilePage,
  //canActivate: [LoginSvc],
},{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
}]


@NgModule({
  declarations: [
    LoginComponent,LogoutComponent,
    VerifyEmailComponent,
    PasswordResetComponent,
    ChangeEmailComponent,
    RemoveAccountComponent,
    UserProfilePage    
  ],
  imports: [
    //BrowserModule,
    //BrowserAnimationsModule,
    CommonModule, FormsModule, ReactiveFormsModule,
    AppMateralModule, SystemComponentsModule, FireModule,
    RouterModule.forChild(routes)
  ],
  providers: [LoginSvc],
  exports: [
    LoginComponent,LogoutComponent,
    VerifyEmailComponent,
    PasswordResetComponent,
    ChangeEmailComponent,
    RemoveAccountComponent,
    UserProfilePage
  ],
  //bootstrap: [LoginComponent]
})
export class UserModule {
  constructor() {
    //debugger
    //console.log("Login module loaded");
  }
}
