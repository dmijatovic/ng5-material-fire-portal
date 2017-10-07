//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Custom material module used to add all material components used
 * from here the components are avaliable to every component
 * in the application
 */
import { AppMateralModule } from '../material/material.module'; 

//local app
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


//-----------------------------------
//ROUTES
//-----------------------------------
const routes:Routes=[{
  path:'',
  component: HomeComponent
}]


@NgModule({
  declarations: [
    AppComponent,HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMateralModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
