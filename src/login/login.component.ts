//angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginSvc } from './login.svc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  panelTitle:string="Login";
  loginForm:FormGroup;
  loginStatus:string="";
  loginMsg:string="provide credentials and hit login";
  //indicates if primary button
  //is login or register
  login:boolean=true;
  //the button labels 
  //used when switching
  primBtn:string="Login";
  secoBtn:string="Register";
  //loader flag
  showLoader:boolean=false;
  
  constructor(
    private formBuilder: FormBuilder,
    private fire: LoginSvc,
    private router: Router,
    private routeData: ActivatedRoute
  ) { }

  ngOnInit() {
     //create form group
     this.loginForm = this.formBuilder.group({
       email:['', Validators.required],
       password:['',Validators.required]
     });     
     //decide based on route data which 
     //version of component 
     debugger
     let data:any = this.routeData.data;
     this.login = data.login;
     //set button labels
     this.buttonLabels()
  }
  /**
   * this function toggles 
   * button labels based 
   * on login flag
   */
  buttonLabels(){
    if (this.login==true){
      this.primBtn="Login";
      this.secoBtn="Register";
      this.panelTitle="Login";
      this.loginStatus="";
      this.loginMsg="provide credentials and hit login";
    }else{
      this.primBtn="Register";
      this.secoBtn="Login";
      this.panelTitle="Register";
      this.loginStatus="";
      this.loginMsg="provide email and password and hit register button";
    }
  }
  toggleAction(){
    //toggle login glaf
    this.login=!this.login;
    //change labels 
    this.buttonLabels();
  }
  onAction(){
    if (this.login){
      this.onLogin();
    }else{
      this.onRegister();
    }
  }
  onLogin(){
    //console.log("Here we login");
    this.loginStatus="TRYING...";
    this.showLoader=true;
    let cred = this.loginForm.value;
    this.fire.logIn(cred.email,cred.password)
      .then((d)=>{
        //debugger
        console.log("logged in");        
        //save credentials 
        //this.fire.saveProfile(d);
        //forward now to home page 
        if (d.emailVerified==true){
          this.router.navigateByUrl("home");
        }else{
          this.router.navigateByUrl("verify");
        }        
      },(e)=>{
        this.loginStatus="FAILED";
        this.loginMsg = e.message;
        console.error("Failed to login", e.message);
        this.showLoader=false;
      });
  }
  onRegister(){
     //console.log("Here we login");
     this.loginStatus="TRYING...";
     this.showLoader=true;
     let cred = this.loginForm.value;
     this.fire.register(cred.email,cred.password)
       .then((d)=>{
         //debugger
         console.log("did register");
         //let t = d.json();
         //save credentials 
         //this.fire.saveProfile(d);
         //forward now to home page 
         this.router.navigate(["verify"]);
       },(e)=>{
         this.loginStatus="FAILED";
         this.loginMsg = e.message;
         console.error("Failed to register:", e.message);
         this.showLoader=false;
       });
  }

}
