//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { AnimateFrame, AnimateHomePage, AnimateScrollPage  } from './index';

/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes:Routes=[{
    path:'animate',
    redirectTo:'animate/home',
    pathMatch:'full'
},{
    path:'animate',
    component: AnimateFrame,
    children:[{
        path:'home',
        component: AnimateHomePage
    },{
        path:'scroll',
        component: AnimateScrollPage
    }]
}]

@NgModule({
  declarations: [
    AnimateFrame, AnimateHomePage, AnimateScrollPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    MatCardModule, MatProgressSpinnerModule,
    //Router
    RouterModule.forChild(routes)
  ],  
  exports:[ 
      AnimateFrame, AnimateHomePage, AnimateScrollPage 
    ]
})
export class AnimationsModule { }
