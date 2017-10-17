import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { SystemComponentsModule } from '../../system/util.module'

import { AppMateralModule } from '../../material/material.module';

//import { FireSvc } from '../../firebase/firebase.svc';

/**
 * ROUTES
 * module specific routes  
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes: Routes = [{
   path: '',
   component: HomeComponent
}, {
   path: 'menu',
   component: MenuComponent
}]

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      AppMateralModule,
      SystemComponentsModule,
      RouterModule.forChild(routes)
   ],
   declarations: [HomeComponent, MenuComponent]
})
export class AdminModule { }
