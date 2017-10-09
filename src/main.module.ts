//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//get environment for connection to server
//import { environment as env } from './environments/environment';

/**
 * MATERIAL SECTION
 * Custom material module used to add all material components used
 * from here the components are avaliable to every component
 * in the application
 */
import { AppMateralModule } from './material/material.module'; 

/** 
 * SYSTEM MODULE 
 * here we handle 
*/
import { SystemModule } from './system/system.module';

/**
 * LOGIN SECTION
 * login module covers authentication,
 * register, login and forgot password
 * pages are part of the module
 */
import { LoginModule } from './login/login.module';
//import { LoginSvc } from './login/login.svc';

/**
 * MAIN APP MODULE
 */
import { AppModule } from './app/app.module';

//main outlet component 
//itś just a router-outlet
import { MainOutlet } from './main.outlet';

/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes:Routes=[{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
}]

@NgModule({
  declarations: [ MainOutlet ],
  imports: [
    //BrowserModule, BrowserAnimationsModule,
    AppMateralModule,LoginModule,
    SystemModule,AppModule,    
    //Router
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [ MainOutlet ]
})
export class MainModule { }
