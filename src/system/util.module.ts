//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'


import { RouterModule } from '@angular/router'

//get environment for connection to server
import { environment as env } from '../environments/environment';

//material components 
import {
  MatProgressSpinnerModule, MatButtonModule,
  MatIconModule, MatInputModule
} from '@angular/material';

/**
 * UTILITY components
 */
import { LoaderComponent } from './loader';
import { ListItemComponent, dv4List } from './dv4-list-item';
import { MessageCard } from './message.card';


/**
 * UTILITY SERVICE
 */
//import {} from ''

@NgModule({
  declarations: [
    MessageCard,
    LoaderComponent,
    ListItemComponent,
    dv4List
  ],
  imports: [
    CommonModule,FormsModule,RouterModule,
    MatButtonModule, MatProgressSpinnerModule,
    MatIconModule, MatInputModule
  ],
  providers: [],
  exports: [
    MessageCard,
    LoaderComponent,
    ListItemComponent,
    dv4List
  ]
})
export class SystemComponentsModule { }
