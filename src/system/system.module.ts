//angular boot
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

//get environment for connection to server
import { environment as env } from '../environments/environment';


import { MatProgressSpinnerModule, MatButtonModule } from '@angular/material';

//import { AppMateralModule } from '../material/material.module';

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
const routes: Routes = [{
   path: 'error',
   children: [{
      path: '',
      redirectTo: '500',
      pathMatch: 'full'
   }, {
      path: ':id',
      component: ErrorComponent
   }]
}]

@NgModule({
   declarations: [
      ErrorComponent, LoaderComponent
   ],
   imports: [
      //BrowserModule,
      //BrowserAnimationsModule,    
      MatProgressSpinnerModule,
      MatButtonModule,
      //Router
      RouterModule.forChild(routes)
   ],
   exports: [ErrorComponent, LoaderComponent]
})
export class SystemModule { }
