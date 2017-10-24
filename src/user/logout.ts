import { Component, OnInit, OnDestroy } from '@angular/core';

import { sysMsg } from '../system/sys.msg';
import { LoginSvc } from '../firebase/login.svc'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
  styleUrls: ['../system/error.scss','./logout.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {
  //default values
  matIcon: string = 'bug_report';
  errTitle: string = "These things not add up!";
  errMsg: string = `
  <p>This page should display the logout message.
  The logout message is not defined in the 
  system settings. Please notify adminstrator about this.
  `;
  errNumber: string = '999';  
  btn:any;

  constructor(
    private fire:LoginSvc
  ){}
  ngOnInit() {
    //debugger    
    //get logout message from system
    let msg = sysMsg["logout"];
    //logout user
    this.fire.logOut()
    .then(()=>{
      if (msg){
        this.showMsg(msg);          
      }    
    })
    .catch((e)=>{
      console.error(e);
    });        
  }

  showMsg(msg) {
    //debugger
    this.matIcon = msg.matIcon;
    this.errTitle = msg.title;
    this.errMsg = msg.msg;
    this.errNumber = msg.id;
    this.btn = msg.btn 
  }

  ngOnDestroy(){}
}