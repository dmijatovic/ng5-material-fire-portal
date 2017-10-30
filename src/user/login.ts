//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { LoginSvc } from '../firebase/login.svc';
import { environment as env } from '../environments/environment';
//page definitions from user.cfg file 
import { LoginCfg } from './user.cfg';
import { UserInputForm } from './user.input.form';

@Component({
  selector: 'app-user-register',
  templateUrl: './login.html'
  //styleUrls: ['./login.scss']
})
export class UserLogin implements OnInit {  
  //config
  loginCfg = LoginCfg;
  //ref to child form
  @ViewChild('loginForm') loginForm:UserInputForm;
  
  constructor(    
    private fire: LoginSvc,
    private router: Router    
  ) {
    //debugger
    //console.log("UserLogin...constructor");
  }
  ngOnInit(){
    this.loginForm.setMsg({
      status:'',
      msg: this.loginCfg.msg.default,
      error: false 
    });
  }
  /**
   * LOGIN
   */
  onLogin({ email, password }) {
    //console.log("Here we login");
    //debugger 
    //set message 
    this.loginForm.setMsg({
      status: "T...",
      msg:"Signin in ...",
      error: false 
    });
    //show loader
    this.loginForm.toggleLoader();      
    //issue register request 
    this.fire.logIn(email, password)
      .then((d) => {
        //check 
        return {
          email: d.email,
          veryfied: d.emailVerified
        };
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
        //debugger
        if (profile && profile.type && profile.type=="NAVIGATE") {
          //navigate to verify page
          this.router.navigate(profile.payload);
        } else if (profile){
          if (profile.startpage){
            //navigate to startpage from profile
            this.router.navigateByUrl(profile.startpage);
          }else{
            console.error("Startpage not defined in profile");
            this.router.navigateByUrl( env.cfg.startPage );
          }          
        } else if (profile == null) {
          //user is logged in and veryfied
          //but it has no profile yet
          //LET'S CREATE  A PROFILE
          this.router.navigate(["user","profile"]);
        }
      })
      .catch((e) => {
        //set message 
        this.loginForm.setMsg({
          status: "F...",
          msg: e.message,
          error: true 
        }); 
        //toggle loader
        this.loginForm.toggleLoader();
      });
  }
}
