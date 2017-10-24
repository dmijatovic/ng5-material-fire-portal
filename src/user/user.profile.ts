//angular 
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginSvc } from '../firebase/login.svc';
import { ProfileSvc } from '../firebase/profile.svc';

@Component({
   selector: 'app-user-profile',
   templateUrl: './user.profile.html',
   styleUrls: ['./login.scss', './user.profile.scss'],
   providers:[ ProfileSvc ]
})
export class UserProfilePage implements OnInit {

   title = 'Create user profile';
   profileForm: FormGroup;
   
   pages = ['page1', 'page2', 'page3'];

   showLoader: boolean = false;

   constructor(
      private fb: FormBuilder,
      private user: LoginSvc,
      private data: ProfileSvc,
      private router: Router
   ) {
   }
   ngOnInit() {
      //get email 
      let eml = this.getEmail();
      //get metnu items 
      this.getMenuItems();
      //debugger 
      this.profileForm = this.fb.group({
         email: [eml, Validators.required],
         firstName: [null, Validators.required],
         lastName: [null, Validators.required],
         birthDate: [null],
         birthCity: [null],
         startpage: [null, Validators.required],
      });
   }
   getEmail(){
      try{
         let email = this.user.getProfile().email;
         return email;
      }catch(e){
         console.error(e);
         return null 
      }      
   }
   getMenuItems(){
      this.user.getListofAllMenuItems()
         .then((d:any)=>{
            console.log(d);
            //debugger
            this.pages = d;
         });      
   }
   onSubmit(data) {
      console.log("save profile", data);

      this.data.saveProfile(data)
      .then((d)=>{
         //debugger 
         console.log(d);
         //forward to start page 
         this.router.navigate([data.startpage]);
      },(e)=>{
         //debugger 
         console.error(e);
      });
   }
}