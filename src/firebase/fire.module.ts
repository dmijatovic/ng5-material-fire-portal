//angular
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { RouterModule, Routes } from '@angular/router'

/**
 * FIREBASE DEPENDENCIES
 */
//firebase modules 
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//get environment for connection to server
import { environment as env } from '../environments/environment';

@NgModule({
   declarations: [ ],
   imports: [
      //BrowserModule,
      //BrowserAnimationsModule,
      //CommonModule,      
      //Firebase
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(env.firebase),
      //Router
      //RouterModule.forChild(routes)
   ],
   providers: [],
   exports:[]
   //bootstrap: [AppComponent]
})
export class FireModule { }
