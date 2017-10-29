//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { LoginSvc } from '../firebase/login.svc';

//page definitions from user.cfg file 
import { ChangeEmailCfg } from './user.cfg';
import { UserInputForm } from './user.input.form';

@Component({
  selector: 'user-change-email',
  templateUrl: './change.email.html'
  //styleUrls: ['./PasswordReset.scss']
})
export class UserChangeEmail implements OnInit {
  //config
  changeEmailCfg = ChangeEmailCfg;  
  //ref to child form
  @ViewChild('changeForm') changeForm: UserInputForm;
  //user reference
  user:any;  
  constructor(
    private fire: LoginSvc,
    private router: Router
  ) {
    //debugger
    //console.log("UserPasswordReset...constructor");
  }
  ngOnInit() {    
    //check 
    this.user = this.fire.getProfile();
    debugger 
    if (this.user){
      //set initial message
      this.changeForm.setMsg({
        status: '',
        msg: this.changeEmailCfg.msg.default,
        error: false
      });
    }else{
      //ups no user/email
      this.changeForm.hideForm = true;
      this.changeForm.setMsg({
        status:'F...',
        msg: this.changeEmailCfg.msg.login,
        error:true 
      });
    }
  }
  /**
   * Change email
   */
  onEmailChange({ oldemail, newemail }) {
    //console.log("Here we login");
    debugger

    if (oldemail.toLowerCase() == this.user.email.toLowerCase()
      && newemail.toLowerCase()!= this.user.email.toLowerCase() ){
      
      //set message 
      this.changeForm.setMsg({
        status: "T...",
        msg: "Updating ...",
        error: false
      });
      //show loader
      this.changeForm.toggleLoader();

      //change email
      this.changeEmail(newemail)
      .then((d)=>{
        //hide loader
        this.changeForm.toggleLoader();
        //hide form 
        this.changeForm.hideForm = true;
        //show message
        this.changeForm.setMsg(d);  
      })
      .catch((m)=>{
        //show message in child form
        this.changeForm.setMsg(m);  
      });

    }else{
      //set message 
      this.changeForm.setMsg({
        status: "F...",
        msg: this.changeEmailCfg.msg.invalid,
        error: true
      });
      //change start email from here 
      this.changeForm.inputForm.patchValue({
        oldemail: this.user.email 
      });
      //disable it
      //debugger
      //this.changeForm.inputForm.controls['oldemail'].disabled();
    }   
  }  

  changeEmail(email):Promise<any>{
    return new Promise((res,rej)=>{
      this.fire.changeUserEmail(email)
        .then((d) => {          
          //console.log("changed email");          
          //show message
          res({
            status: "OK",
            msg:this.changeEmailCfg.msg.success,
            error: false
          });
        }, (e) => {
          rej({
            status: "F...",
            msg: e.message,
            error: true
          });          
        });
    });
  }
}
