//angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginSvc } from '../firebase/login.svc';

export interface formBtn {
  label: string;
  link: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
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
  primBtn: formBtn;
  secoBtn: formBtn;
  thrdBtn: formBtn;

  //loader flag
  showLoader: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fire: LoginSvc,
    private router: Router,
    private routeData: ActivatedRoute
  ) {
    //debugger
    //console.log("Login.LoginComponent...constructor");
  }

  ngOnInit() {
    //create form group
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    //get form data from route      
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
  onAction() {
    //console.log("login.onAction");
    if (this.login) {
      this.onLogin();
    } else {
      this.onRegister();
    }
  }
  onLogin() {
    //console.log("login.onLogin");
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
        //debugger
        //if email is veryfied
        if (d.veryfied == true) {
          //get user profile 
          return this.fire.getUserProfile(d.email);
        } else {
          //if email is not veryfied 
          //we should go to the veryfication page
          //where we send veryfication email
          //to this user (who probably just registered)
          return {
            type:"NAVIGATE",
            payload:["user","verify"]
          }
        }
      })
      .then((profile: any) => {
        debugger
        if (profile && profile.type && profile.type=="NAVIGATE") {
          //navigate to verify page
          this.router.navigate(profile.payload);
        } else if (profile && profile.startpage){
          //navigate to startpage from profile
          this.router.navigateByUrl(profile.startpage);
        } else if (profile == null) {
          //user is logged in and veryfied
          //but it has no profile yet
          //LET'S CREATE  A PROFILE
          this.router.navigate(["user","profile"]);
        }
      })
      .catch((e) => {
        debugger
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
        //forward now to verify
        this.router.navigate(["verify"]);
      }, (e) => {
        this.panelStatus = "FAILED";
        this.panelMsg = e.message;
        console.error("Failed to register:", e.message);
        this.showLoader = false;
      });
  }
}
