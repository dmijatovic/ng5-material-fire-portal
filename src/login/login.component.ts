//angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginSvc } from './login.svc';

export interface formBtn{
   label:string;
   link:string;
}

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   panelTitle: string = null;
   loginForm: FormGroup;
   panelStatus: string = null;
   panelMsg: string = null;
   //indicates if primary button
   //is login or register
   login: boolean = true;
   //the button labels    
   //used when switching
   primBtn:formBtn;
   secoBtn:formBtn;
   thrdBtn:formBtn;

   //loader flag
   showLoader: boolean = false;

   constructor(
      private formBuilder: FormBuilder,
      private fire: LoginSvc,
      private router: Router,
      private routeData: ActivatedRoute
   ) { }

   ngOnInit() {
      //create form group
      this.loginForm = this.formBuilder.group({
         email: ['', Validators.required],
         password: ['', Validators.required]
      });

      //get form data from route
      //
      this.routeData.data
         .subscribe((d) => {
            //debugger
            this.login = d.login;
            //buttons
            this.primBtn = d.primBtn;
            this.secoBtn = d.secoBtn;
            this.thrdBtn = d.thrdBtn;
            //start message
            this.panelTitle = d.panelTitle;
            this.panelMsg = d.panelMsg;            
         });
   }
   /**
    * this function toggles 
    * button labels based 
    * on login flag
    *//*
   buttonLabels() {
      if (this.login == true) {
         this.primBtn.label = "Login";
         this.secoBtn.label = "Register";
         this.panelTitle = "Login";
         this.panelStatus = "";
         this.panelMsg = "provide credentials and hit login";
      } else {
         this.primBtn = "Register";
         this.secoBtn = "Login";
         this.panelTitle = "Register";
         this.panelStatus = "";
         this.panelMsg = "provide email and password and hit register button";
      }
   }
   toggleAction() {
      //toggle login glaf
      this.login = !this.login;
      //change labels 
      this.buttonLabels();
   }*/
   onAction() {
      if (this.login) {
         this.onLogin();
      } else {
         this.onRegister();
      }
   }
   onLogin() {
      //console.log("Here we login");
      this.panelStatus = "TRYING...";
      this.showLoader = true;
      let cred = this.loginForm.value;
      this.fire.logIn(cred.email, cred.password)
         .then((d) => {
            //debugger
            console.log("logged in");
            //check 
            return {
               email: d.email,
               veryfied: d.emailVerified
            };
            //save credentials
            //this.fire.saveProfile(d);
         })
         .then((d) => {
            debugger
            //if email is veryfied
            if (d.veryfied == true) {
               //get user profile 
               return this.fire.getUserProfile(d.email);
            } else {
               //if email is not veryfied 
               //we go veryfication page
               //and send veryfication email 
               //to this user (that probably just registered)
               this.router.navigateByUrl("verify");
               return false;
            }
         })
         .then((profile: any) => {
            //debugger
            if (profile) {
               //if profile exist we extract 
               //startpage from profile
               this.router.navigateByUrl(profile.startpage);
            } else {
               //throw new Error("Failed to retreive user profile");
               //user is logged in but it has no profile yet
               //LET'S CREATE  A PROFILE
               this.router.navigateByUrl("profile");
            }
            //this.router.navigateByUrl("home");
         })
         .catch((e) => {
            this.panelStatus = "FAILED";
            this.panelMsg = e.message;
            console.error("Failed to login", e.message);
            this.showLoader = false;
         });
   }
   onRegister() {
      //console.log("Here we login");
      this.panelStatus = "TRYING...";
      this.showLoader = true;
      let cred = this.loginForm.value;
      this.fire.register(cred.email, cred.password)
         .then((d) => {
            //debugger
            console.log("did register");
            //let t = d.json();
            //save credentials 
            //this.fire.saveProfile(d);
            //forward now to home page 
            this.router.navigate(["verify"]);
         }, (e) => {
            this.panelStatus = "FAILED";
            this.panelMsg = e.message;
            console.error("Failed to register:", e.message);
            this.showLoader = false;
         });
   }
}
