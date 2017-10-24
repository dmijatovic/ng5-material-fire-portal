//angular boot
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

//get environment for connection to server
import { environment as env } from '../environments/environment';

import { MatButtonModule } from '@angular/material';

import { ErrorComponent } from './error.component';

//import { sysMsg } from './sys.msg';

/**
 * ROUTES
 * top lever route,
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes: Routes = [{
   path: 'error',
   children: [{
      path: '',
      redirectTo: '500',
      pathMatch: 'full'
   }, {
      path: ':id',
      component: ErrorComponent
   }]
}]

@NgModule({
   declarations: [
      ErrorComponent
   ],
   imports: [      
      MatButtonModule,
      //Router
      RouterModule.forChild(routes)
   ],
   exports: [ErrorComponent]
})
export class SystemErrorModule {}
