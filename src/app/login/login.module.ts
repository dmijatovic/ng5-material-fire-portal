//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

/**
 * Custom material module used to add all material components used
 * from here the components are avaliable to every component
 * in the application
 */
import { AppMateralModule } from '../../material/material.module'; 

//local app
import { LoginComponent } from './login.component';


//-----------------------------------
//ROUTES
//-----------------------------------
const routes:Routes=[{
  path:'login',
  component: LoginComponent
}]


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMateralModule, FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [LoginComponent]
})
export class LoginModule { }
