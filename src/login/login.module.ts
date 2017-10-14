//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//material modules
import { AppMateralModule } from '../material/material.module';

//get environment for connection to server
import { environment } from '../environments/environment';

//local app
import {
   LoginComponent, VerifyComponent,
   PasswordComponent, ChangeEmailComponent,
   RemoveAccountComponent, UserProfilePage
} from './index';

//firebase service
import { LoginSvc } from './login.svc'

import { SystemModule } from '../system/system.module';

//-----------------------------------
//ROUTES
//-----------------------------------

const routes: Routes = [{
   path: 'login',
   component: LoginComponent,
   data: {   
      panelTitle:"Login", 
      login: true,
      primBtn:{
         label:'Login',
         link:'login'
      },
      secoBtn:{
         label:'Forgot password',
         link:'/password'
      },
      thrdBtn:{
         label:'Register',
         link:'/register'
      },
      panelMsg:'Provide credentials and press login button.'
   } 
},{
   path: 'register',
   component: LoginComponent,
   data: {    
      panelTitle:"Register",
      login: false,
      primBtn:{
         label:'Register',
         link:'register'
      },
      secoBtn:{
         label:'Forgot password',
         link:'/password'
      },
      thrdBtn:{
         label:'Login',
         link:'/login'
      },
      panelMsg:'Provide email and password to register.'
   }
}, {
   path: 'verify',
   component: VerifyComponent
}, {
   path: 'password',
   component: PasswordComponent
}, {
   path: 'email',
   component: ChangeEmailComponent
}, {
   path: 'remove',
   component: RemoveAccountComponent
}, {
   path: 'profile',
   component: UserProfilePage,
   canActivate: [ LoginSvc ],
}]


@NgModule({
   declarations: [
      LoginComponent,
      VerifyComponent,
      PasswordComponent,
      ChangeEmailComponent,
      RemoveAccountComponent,
      UserProfilePage
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule, ReactiveFormsModule,
      AppMateralModule, SystemModule,
      RouterModule.forChild(routes)
   ],
   providers: [LoginSvc],
   exports: [
      LoginComponent,
      VerifyComponent,
      PasswordComponent,
      ChangeEmailComponent,
      RemoveAccountComponent,
      UserProfilePage
   ],
   bootstrap: [LoginComponent]
})
export class LoginModule { }
