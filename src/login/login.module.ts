//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//material modules used
import {
    MatInputModule, MatButtonModule, MatExpansionModule
} from '@angular/material';

//get environment for connection to server
import { environment } from '../environments/environment';

//local app
import { 
    LoginComponent, VerifyComponent,
    PasswordComponent, ChangeEmailComponent,
    RemoveAccountComponent
} from './index';



//firebase service
import { LoginSvc } from './login.svc'

import { SystemModule } from '../system/system.module';

//-----------------------------------
//ROUTES
//-----------------------------------
const routes:Routes=[{
    path:'login',
    component: LoginComponent,
    data:{signin:true}
},{
    path:'register',
    component: LoginComponent,
    data:{signin:false}
},{
    path:'verify',
    component: VerifyComponent
},{
    path:'password',
    component: PasswordComponent
},{
    path:'email',
    component: ChangeEmailComponent
},{
    path:'remove',
    component: RemoveAccountComponent
}]


@NgModule({
    declarations: [
        LoginComponent,
        VerifyComponent,
        PasswordComponent,
        ChangeEmailComponent,
        RemoveAccountComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,ReactiveFormsModule,
        MatInputModule,MatButtonModule,
        MatExpansionModule,
        SystemModule,
        RouterModule.forChild(routes)
    ],
    providers: [ LoginSvc ],
    exports: [
        LoginComponent,
        VerifyComponent,
        PasswordComponent,
        ChangeEmailComponent,
        RemoveAccountComponent
    ],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
