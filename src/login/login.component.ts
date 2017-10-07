//angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginSvc } from './login.svc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;
  loginStatus:string="";
  loginMsg:string="provide credentials and hit login";
  
  constructor(
    private formBuilder: FormBuilder,
    private fire: LoginSvc,
    private router: Router
  ) { }

  ngOnInit() {
     //create form group
     this.loginForm = this.formBuilder.group({
       email:['', Validators.required],
       password:['',Validators.required]
     });
  }

  onLogin(){
    //console.log("Here we login");
    this.loginStatus="TRYING...";
    let cred = this.loginForm.value;
    this.fire.logIn(cred.email,cred.password)
      .then((d)=>{
        debugger
        console.log("logged in");
        //let t = d.json();
        //save credentials 
        this.fire.saveProfile(d);
        //forward now to home page 
        this.router.navigateByUrl("home");

      },(e)=>{
        this.loginStatus="FAILED";
        this.loginMsg = e.message;
        console.error("Failed to login", e.message);
      });
  }

}
