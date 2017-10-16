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
//import { LoginModule } from './login/login.module';
//import { LoginSvc } from './login/login.svc';

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
  path:'private',  
  loadChildren: 'app/app.module#AppModule'
},{
  path:'',  
  redirectTo:'public',
  pathMatch:'full'
}
/*,{
    path:'**',
    redirectTo:'/error/404',
    pathMatch:'full'
}*/]

@NgModule({
  declarations: [ MainOutlet ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMateralModule,
    //LoginModule,
    SystemModule,//PublicModule,AppModule,    
    //Router (always last)
    RouterModule.forRoot(routes)
  ],
  providers: [ ],
  bootstrap: [ MainOutlet ]
})
export class MainModule { }
