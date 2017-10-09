import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginSvc } from './login.svc';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./login.component.scss']
})
export class VerifyComponent implements OnInit {
  /**
   * Page to show when email verification 
   * is send
   */
  //user email used
  email:string="no email provided";
  signiture:string ='dv4all, Firebase demo team';
  showBtn:boolean = false;

  constructor(
    private fire:AngularFireAuth,
    private login:LoginSvc,
    private router:Router
  ) { }

  ngOnInit() {    
    //debugger
    let user = this.login.getProfile();
    if (user){
      this.showBtn=true;
      this.email = user.email; 
      this.sendVerificationEmail();
    }else{
      this.showBtn=false;
      //console.error("No user logged in");
      this.router.navigate(['error','401']);
    }
    //subscribe here to user changes 
    this.fire.auth.onAuthStateChanged((u)=>{

      console.log("verify onAuthStateChange:",u);
      
    });

  }
  sendVerificationEmail(){
    this.login.sendEmailVerification()
    .then(()=>{
      //debugger 
      console.log("send code to email");
    },(e)=>{
      //debugger 
      console.error(e);
    }); 
  }  
}
