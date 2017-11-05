//angular boot
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
/**, Routes
 * MATERIAL SECTION
 * Custom material module used to add all material components used
 * this module need to added in child modules. It seems that
 * reference from the top does not work as with services?!?
 */
//import { AppMateralModule } from './material/material.module';
/**
 * SYSTEM MODULES
 * here we handle
*/
import { SystemErrorModule } from './system/error.module';
import { SystemComponentsModule } from './system/util.module';
//service to emit/dispatch actions between app components
import { SystemActionSvc } from './system/sys.action.svc';

/**
 * FIREBASE SECTION
 * login module covers authentication,
 * register, login and forgot password
 * pages are part of the module
 */
import { FireModule } from './firebase/fire.module';
import { LoginSvc } from './firebase/login.svc';
/**
 * MAIN outlet
 */
import { MainOutlet } from './main.outlet';
/**
 * ROUTES
 * top level route loaded in main-outlet
 * lazy loading of modules
 */
const routes:Routes=[{
  path:'app',
  loadChildren:'app/app.module#AppModule'
},{
  path:'user',
  loadChildren:'user/user.module#UserModule'
},/*{
  path:'',
  redirectTo:'user/login',
  pathMatch:'full'
}*/{
  path:'',
  component: MainOutlet
},{
    path:'**',
    redirectTo:'/error/404',
    pathMatch:'full'
}]

@NgModule({
  declarations: [ MainOutlet ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FireModule,
    //AppMateralModule,
    //LoginModule,
    //PublicModule,AppModule,
    SystemErrorModule,
    SystemComponentsModule,
    //Router (always last)
    RouterModule.forRoot(routes)
  ],
  providers: [ LoginSvc, SystemActionSvc ],
  bootstrap: [ MainOutlet ]
})
export class MainModule { }
