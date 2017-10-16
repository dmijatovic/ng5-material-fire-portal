import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

/**
 * ROUTES
 * CHAT module routes   
 */
const routes:Routes=[{
  path:'',        
  component: HomeComponent  
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class ChatModule { }
