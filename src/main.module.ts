//angular boot
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

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
 * SYSTEM MODULES 
 * here we handle 
*/
import { SystemErrorModule } from './system/error.module';

/**
 * LOGIN SECTION
 * login module covers authentication,
 * register, login and forgot password
 * pages are part of the module
 */
//import { UserModule } from './user/user.module';
//firebase modules 
import { FireModule } from './firebase/fire.module';
import { LoginSvc } from './firebase/login.svc';

/**
 * MAIN ***PRIVATE*** APP MODULE
 */
//import { AppModule } from './app/app.module';
/**
 * PUBLIC pages module
 */
//import { PublicModule } from './public/public.module';


//main outlet component 
//itś just a router-outlet
import { MainOutlet } from './main.outlet';

/**
 * ROUTES
 * top lever route loaded in main-outlet
 * lazy loading public or private module
 */
const routes:Routes=[{
  path:'public',  
  loadChildren: 'public/public.module#PublicModule'
},{
  path:'app',  
  loadChildren: 'app/app.module#AppModule'
},{
  path:'user',  
  loadChildren: 'user/user.module#UserModule'
},{
  path:'',  
  redirectTo:'user/login',
  pathMatch:'full'
},/*{
    path:'**',
    redirectTo:'/error/404',
    pathMatch:'full'
}*/]

@NgModule({
  declarations: [ MainOutlet ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMateralModule, FireModule,
    //LoginModule,
    SystemErrorModule,//PublicModule,AppModule,    
    //Router (always last)
    RouterModule.forRoot(routes)
  ],
  providers: [ LoginSvc ],
  bootstrap: [ MainOutlet ]
})
export class MainModule { }
