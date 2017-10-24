import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginSvc } from '../firebase/login.svc';

@Component({
  selector: 'app-password',
  templateUrl: './password.reset.html',
  styleUrls: ['./login.scss']
})
export class PasswordResetComponent implements OnInit {
  panelTitle:string="Password reset";
  loginForm:FormGroup;
  loginStatus:string="";
  loginMsg:string="Provide the same email address you used to create the account.";
  //loader flag
  showLoader:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private fire: LoginSvc    
  ) { }

  ngOnInit() {
     //create form group
     this.loginForm = this.formBuilder.group({
        email:['', Validators.required]      
    });     
  }
  onResetPassword(){    
    //console.log("reset password");    
    this.loginStatus="TRYING...";
    this.showLoader=true;
    let cred = this.loginForm.value;
    this.fire.sendResetPasswordEmail(cred.email)
      .then((d)=>{
        //debugger
        console.log("reset password SEND");
        
        this.loginStatus="SEND email";
        
        this.loginMsg=`
        We send you an e-mail with a link to use to 
        reset you current password. Please check your 
        mailbox and follow the instruction.
        <br><br>
        Thanks,
        dv4all team
        `

        this.showLoader=false;
      },(e)=>{
        this.loginStatus="FAILED";
        this.loginMsg = e.message;
        console.error("Failed to login", e.message);
        this.showLoader=false;
      });

  }
}
