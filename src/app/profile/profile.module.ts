//angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { ProfileHomeComponent } from './home/home.component';
import {
  AvatarCard,  ProfileCard, ProfileForm
} from '../../user/profile';

//app modules
import { AppMateralModule } from '../../material/material.module';
import { SystemComponentsModule } from '../../system/util.module';

//services
import { LoginSvc } from '../../firebase/login.svc'; 

/**
 * ROUTES
 * module specific routes  
 * most of the routing is module specific
 * therefore we have minimal routing at the top
 */
const routes: Routes = [{
  path: '',
  component: ProfileHomeComponent,
  canActivate:[ LoginSvc ]
}]

@NgModule({
  imports: [
    CommonModule, FormsModule,ReactiveFormsModule,
    AppMateralModule,SystemComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfileHomeComponent, AvatarCard, 
    ProfileForm, ProfileCard
  ]  
})
export class ProfileModule { }
