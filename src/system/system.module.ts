//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//get environment for connection to server
import { environment as env } from '../environments/environment';


import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

/**
 * LOGIN SECTION
 * login module covers authentication,
 * register, login and forgot password
 * pages are part of the module
 */
//import { LoginModule } from '../login/login.module';
//import { LoginSvc } from '../login/login.svc';
/**
 * MAIN APP PAGES/COMPONENTS 
 */
//local app
//import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';

import { ErrorComponent } from './error.component';
import { LoaderComponent } from './loader.component';
//import { sysMsg } from './sys.msg';

/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes:Routes=[{
    path:'error',
    redirectTo:'error/500',
    pathMatch:'full'
},{
    path:'error/:id',
    component: ErrorComponent    
}/*,{
  //just for testing
  path:'system/loader',
  component: LoaderComponent    
}*/]

@NgModule({
  declarations: [
    ErrorComponent, LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    MatCardModule, MatProgressSpinnerModule,
    //Router
    RouterModule.forChild(routes)
  ],  
  exports:[ ErrorComponent, LoaderComponent ]
})
export class SystemModule { }
