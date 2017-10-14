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
import { LoginModule } from '../login/login.module'

/**
 * LOCAL COMPONENTS
 */
import {
   PublicComponent, AppPublicHeader, AppPublicFooter,
   HomePublic,SigninComponent
} from './index';


/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes: Routes = [{
   path: 'public',
   component: PublicComponent,
   children: [{
      path: '',
      component: HomePublic
   },{
      path: 'signin',
      component: SigninComponent,
      data:{login:true}
   },{
      path: 'register',
      component: SigninComponent,
      data:{login:false}
   }]
}]

@NgModule({
   declarations: [
      PublicComponent, AppPublicHeader, 
      AppPublicFooter, HomePublic,
      SigninComponent
   ],
   imports: [
      //material components
      AppMateralModule,LoginModule,
      //Router
      RouterModule.forChild(routes)
   ],
   providers: [],
   exports: [PublicComponent]
})
export class PublicModule { }
