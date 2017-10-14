//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

//material module
import { AppMateralModule } from '../../material/material.module'

//local modules 
import { AnimateFrame, AnimateHomePage, AnimateScrollPage  } from './index';

/**
 * ROUTES
 * module specific routes  
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes:Routes=[{
    path:'',        
    component: AnimateFrame,
    children:[{
        path:'',
        component: AnimateHomePage,
        data:{
            title:"Page title is this now"
        }
    },{
        path:'home',
        component: AnimateHomePage,
        data:{
            title:"Animations"
        }
    },{
        path:'scroll',
        component: AnimateScrollPage,
        data:{
            title:"Animations - scroll effect"
        }
    }]
}]

@NgModule({
  declarations: [
    AnimateFrame, AnimateHomePage, AnimateScrollPage
  ],
  imports: [    
    AppMateralModule,
    //Router
    RouterModule.forChild(routes)
  ],  
  exports:[ 
      AnimateFrame, AnimateHomePage, AnimateScrollPage 
    ]
})
export class AnimationsModule { }
