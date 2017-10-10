//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * FIREBASE SECTION 
 */
//firebase modules 
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//get environment for connection to server
import { environment as env } from '../environments/environment';

/**
 * MATERIAL SECTION
 * Custom material module used to add all material components used
 * from here the components are avaliable to every component
 * in the application
 */
import { AppMateralModule } from '../material/material.module'; 

/** 
 * SYSTEM MODULE 
 * here we handle 
*/
import { SystemModule } from '../system/system.module';

/**
 * LOGIN SECTION
 * login module covers authentication,
 * register, login and forgot password
 * pages are part of the module
 */
import { LoginModule } from '../login/login.module';
import { LoginSvc } from '../login/login.svc';

/**
 * ANIMATIONS module
 */
import { AnimationsModule } from './animations/animate.module';

/**
 * MAIN APP PAGES/COMPONENTS 
 */
//local app
import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppHeader, AppFooter } from './layout';

/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes:Routes=[
/*{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},*/{
    path:'private',
    component:AppComponent,
    canActivate: [ LoginSvc ],
    children:[{
      path:'',
      component: HomeComponent
    }]
}]

@NgModule({
  declarations: [
    AppComponent,HomeComponent, AppHeader, AppFooter
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMateralModule,LoginModule,
    SystemModule,AnimationsModule,
    //Firebase
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(env.firebase),
    //Router
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports:[ AppComponent,HomeComponent, AppHeader, AppFooter ]
  //bootstrap: [AppComponent]
})
export class AppModule { }
