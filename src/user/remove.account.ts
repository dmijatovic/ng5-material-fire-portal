//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { LoginSvc } from '../firebase/login.svc';
import { ProfileSvc } from '../firebase/profile.svc';
//page definitions from user.cfg file 
import { RemoveAccountCfg } from './user.cfg';
import { UserInputForm } from './user.input.form';

@Component({
  selector: 'user-remove-account',
  templateUrl: './remove.account.html',
  //styleUrls: ['./PasswordReset.scss']
  providers:[ ProfileSvc ]
})
export class UserRemoveAccount implements OnInit {
  //config
  removeCfg = RemoveAccountCfg;
  //ref to child form
  @ViewChild('removeForm') removeForm: UserInputForm;
  //user reference
  user: any;
  constructor(
    private login: LoginSvc,
    private profile: ProfileSvc,
    private router: Router
  ) {
    //debugger
    //console.log("UserPasswordReset...constructor");
  }
  ngOnInit() {
    //check 
    this.user = this.login.getProfile();
    //debugger
    if (this.user) {
      //set initial message
      this.removeForm.setMsg({
        status: '',
        msg: this.removeCfg.msg.default,
        error: false
      });
      //define buttons 
      this.removeCfg.secoBtn={
        label:null,link:null        
      }
      this.removeCfg.thrdBtn={
        label:'Register',link:'../register'
      }
    } else {
      //ups no user/email
      this.removeForm.hideForm = true;
      this.removeForm.setMsg({
        status: 'F...',
        msg: this.removeCfg.msg.login,
        error: true
      });
      //change buttons 
      this.removeCfg.secoBtn={
        label:null,link:null 
      }
      this.removeCfg.thrdBtn={
        label:"Sign in",link:'/user/login'
      }
    }
  }
  /**
   * Change email
   */
  onRemoveAccount({ email, password }) {
    //console.log("Here we login");
    //debugger
    //set message 
    this.removeForm.setMsg({
      status: "T...",
      msg: "Updating ...",
      error: false
    });
    //show loader
    this.removeForm.toggleLoader();
    //change email
    this.Authenticate(email,password)    
    .then(()=>{
      //debugger 
      //remove profile after authenticate
      return this.profile.deleteProfile(email);    
    })
    .then(()=>{
      //debugger
      //remove account from project
      return this.login.removeAccount(); 
    })
    .then(()=>{
      //debugger
      //hide loader
      this.removeForm.toggleLoader();
      //hide form 
      this.removeForm.hideForm = true;
      //show message
      this.removeForm.setMsg({
        status:"OK",
        msg: this.removeCfg.msg.success,
        error:false 
      });
    })
    .catch((e) => {
      //show message in child form
      this.removeForm.setMsg({
        status: "F...",
        msg: e.message,
        error: true
      });
    });    
  }
  /**
   * Authenticate again before removing account 
   * completely
   * @param email 
   * @param pass 
   */
  Authenticate(email,pass):Promise <any> {
    return new Promise((res, rej) => {
      this.login.logIn(email,pass)
      .then((d) => {
        //console.log("changed email");          
        //show message
        res(true);
      }, (e) => {
        rej();
      });
    });
  }
}
