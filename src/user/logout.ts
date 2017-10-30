import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//firebase
//import { AngularFireAuth } from 'angularfire2/auth';
import { LoginSvc } from '../firebase/login.svc';

import { LogoutCfg } from './user.cfg';
import { MessageCard } from '../system/message.card';

/**
 * Page to show when email verification 
 * is send
 */
@Component({
  selector: 'app-user-logout',
  templateUrl: './logout.html',
  styleUrls:['./logout.scss']
})
export class UserLogout implements OnInit {  
  //user email used
  logoutCfg = LogoutCfg;
  @ViewChild('logoutCard') logoutCard:MessageCard;  
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
      //this.logoutCfg.email = user.email;
      this.logoutUser();
    } else {
      //debugger
      //already signed out :-)
      this.logoutCard.setMsg({
        status:'OK',
        msg: this.logoutCfg.msg.success,
        error:false
      });
    }
  }
  logoutUser(){
    this.login.logOut()
    .then(()=>{
      //debugger 
      //console.log("send code to email");
      this.logoutCard.setMsg({
        status:'OK',
        msg: this.logoutCfg.msg.success,
        error:false
      });
      //this.logoutCard.toggleLoader();
    })
    .catch((e)=>{
      //debugger 
      //console.error(e);
      this.logoutCard.setMsg({
        status:'F...',
        msg: e.message,
        error:true
      });
      //this.logoutCard.toggleLoader();
    });
  }
}
