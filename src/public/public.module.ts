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

//import { UserModule } from '../user/user.module'
//import { LoginSvc } from '../firebase/login.svc';

/**
 * LOCAL COMPONENTS
 */
import {
   PublicOutlet, AppPublicHeader, AppPublicFooter,
   HomePublic, 
} from './index';

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
   }]
}]

@NgModule({
   declarations: [
      PublicOutlet, AppPublicHeader, 
      AppPublicFooter, HomePublic
   ],
   imports: [
      //material components
      AppMateralModule,
      FireModule,
      //Router
      RouterModule.forChild(routes)
   ],
   providers: [ ],
   exports: [
      PublicOutlet, AppPublicHeader, AppPublicFooter,
      HomePublic
   ]
})
export class PublicModule { }
