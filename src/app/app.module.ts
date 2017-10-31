//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

/**
 * FIREBASE SECTION 
 */
//firebase module & service
import { FireModule } from '../firebase/fire.module';
//import { FireSvc } from '../firebase/firebase.svc';
//import { LoginSvc } from '../firebase/login.svc';
import { ProfileSvc } from '../firebase/profile.svc';

//get environment for connection to server
//import { environment as env } from '../environments/environment';

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
import { SystemComponentsModule } from '../system/util.module';
/**
 * MAIN APP PAGES/COMPONENTS 
 */
//local app
import { AppHeader, AppFooter, PrivateOutlet } from './layout';
import { HomeComponent } from './home/home.component';
//service to emit/dispatch actions between app components
import { SystemActionSvc } from '../system/sys.action.svc';
/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes: Routes = [{
  path: '',
  component: PrivateOutlet,
  //canActivate:[ LoginSvc ],
  children: [{
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  }, {
    path: 'animations',
    loadChildren: 'app/animations/animate.module#AnimationsModule'
  }, {
    path: 'chat',
    loadChildren: 'app/chat/chat.module#ChatModule'
  }, {
    path: 'football',
    loadChildren: 'app/football/football.module#FootballModule'
  },{
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule'      
  },{
    path: 'weather',
    loadChildren: 'app/weather/weather.module#WeatherModule'
  }, {//empty path as last
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }]
}]

@NgModule({
  declarations: [
    HomeComponent, AppHeader, AppFooter, PrivateOutlet
  ],
  imports: [
    //BrowserModule,
    //BrowserAnimationsModule,
    CommonModule,
    AppMateralModule,
    //routed modules
    //LoginModule, 
    SystemComponentsModule,
    //Firebase
    FireModule,    
    //Router
    RouterModule.forChild(routes)
  ],
  providers: [SystemActionSvc, ProfileSvc],

  exports: [HomeComponent, AppHeader, AppFooter, PrivateOutlet]
  //bootstrap: [AppComponent]
})
export class AppModule { }
