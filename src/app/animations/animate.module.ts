//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

//material module
import { AppMateralModule } from '../../material/material.module'

//local modules 
import { AnimateFrame, AnimateHomePage, AnimateScrollPage  } from './index';

/**
 * ROUTES
 * ANIMATION MODULE specific routes  
 
 */
const routes:Routes=[{
    path:'home',
    component: AnimateFrame,
    children:[{
        path:'',
        component: AnimateHomePage,
        data:{
            title:"Animations"
        }
    }]        
},{
    path:'scroll',
    component: AnimateFrame,
    children:[{
        path:'',
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
