import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//firebase
//import { AngularFireAuth } from 'angularfire2/auth';
import { LoginSvc } from '../firebase/login.svc';

import { VerifyEmailCfg } from './user.cfg';
import { MessageCard } from '../system/message.card';

/**
 * Page to show when email verification 
 * is send
 */
@Component({
  selector: 'user-verify-email',
  templateUrl: './verify.email.html',
  styleUrls: ['./logout.scss']
})
export class UserVerifyEmail implements OnInit {  
  //user email used
  verifyCfg = VerifyEmailCfg;
  @ViewChild('verifyCard') verifyCard:MessageCard;  
  constructor(
    //private fire: AngularFireAuth,
    private login: LoginSvc,
    //private router: Router
  ) { }

  ngOnInit() {
    //debugger
    let user = this.login.getProfile();
    if (user) {
      //this.showBtn = true;
      this.verifyCfg.email = user.email;
      this.sendVerificationEmail();
    } else {
      //debugger
      //console.error(e);
      this.verifyCard.setMsg({
        status:'F...',
        msg: this.verifyCfg.msg.login,
        error:true
      });
    }
  }
  sendVerificationEmail() {
    this.verifyCard.toggleLoader();
    this.login.sendEmailVerification()
      .then((email:string) => {
        //debugger 
        //console.log("send code to email");
        this.verifyCard.setMsg({
          status:'OK',
          msg: this.verifyCfg.msg.success.replace("{{email}}",email),
          error:false
        });
        this.verifyCard.toggleLoader();
      },(e) => {
        //debugger 
        //console.error(e);
        this.verifyCard.setMsg({
          status:'F...',
          msg: e.message,
          error:true
        });
        this.verifyCard.toggleLoader();
      });
  }
}
