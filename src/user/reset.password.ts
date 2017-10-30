//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { LoginSvc } from '../firebase/login.svc';

//page definitions from user.cfg file 
import { ResetPasswordCfg } from './user.cfg';
import { UserInputForm } from './user.input.form';

@Component({
  selector: 'user-reset-password',
  templateUrl: './reset.password.html'
  //styleUrls: ['./PasswordReset.scss']
})
export class UserResetPassword implements OnInit {  
  //config
  resetCfg = ResetPasswordCfg;
  //ref to child form
  @ViewChild('resetForm') resetForm:UserInputForm;
  
  constructor(    
    private fire: LoginSvc,
    private router: Router    
  ) {
    //debugger
    //console.log("UserPasswordReset...constructor");
  }
  ngOnInit(){
    //set initial message
    this.resetForm.setMsg({
      status:'',
      msg: this.resetCfg.msg.default,
      error: false
    });
  }
  /**
   * Reset password
   */
  onReset({ email }) {
    //console.log("Here we login");
    debugger 
    //set message 
    this.resetForm.setMsg({
      status: "T...",
      msg:"Reseting ...",
      error: false 
    });
    //show loader
    this.resetForm.toggleLoader();      
    //issue PasswordReset request 
    this.fire.sendResetPasswordEmail(email)
      .then((d) => {
        //debugger
        //console.log("did PasswordReset");
        //hide loader
        this.resetForm.toggleLoader();
        //hide form 
        this.resetForm.hideForm = true;
        //show message
        this.resetForm.setMsg({
          status: "OK",
          msg:this.resetCfg.msg.success,          
          error: false
        });
      }, (e) => {
        //set message 
        this.resetForm.setMsg({
          status: "F...",
          msg: e.message,
          error: true 
        }); 
        //toggle loader
        this.resetForm.toggleLoader();
      });
  }
}
