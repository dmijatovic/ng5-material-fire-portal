//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

/**
 * MATERIAL MODULES
 * Custom material module used to add all material components used
 * from here the components are avaliable to every component
 * in the application
 */
import { AppMateralModule } from '../material/material.module';
import { FireModule } from '../firebase/fire.module';
import { LoginModule } from '../login/login.module'
//import { LoginSvc } from '../login/login.svc';

/**
 * LOCAL COMPONENTS
 */
import {
   PublicOutlet, AppPublicHeader, AppPublicFooter,
   HomePublic, SigninComponent
} from './index';

import { loginFormData, registerFormData } from './login/login.data';

/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes: Routes = [{
   path: '',
   component: PublicOutlet,
   children: [{
      path: '',
      component: HomePublic
   },{
      path: 'signin',
      component: SigninComponent,
      data: loginFormData
   },{
      path: 'signup',
      component: SigninComponent,
      data: registerFormData
   }]
}]

@NgModule({
   declarations: [
      PublicOutlet, AppPublicHeader, 
      AppPublicFooter, HomePublic,
      SigninComponent
   ],
   imports: [
      //material components
      AppMateralModule,
      FireModule, LoginModule,
      //Router
      RouterModule.forChild(routes)
   ],
   providers: [ ],
   exports: [
      PublicOutlet, AppPublicHeader, AppPublicFooter,
      HomePublic, SigninComponent
   ]
})
export class PublicModule { }
