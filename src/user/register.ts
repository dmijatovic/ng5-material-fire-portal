//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { LoginSvc } from '../firebase/login.svc';

//page definitions from user.cfg file 
import { RegisterCfg } from './user.cfg';
import { UserInputForm } from './user.input.form';

@Component({
  selector: 'app-user-register',
  templateUrl: './register.html'
  //styleUrls: ['./register.scss']
})
export class UserRegister implements OnInit {  
  //config
  registerCfg = RegisterCfg;
  //ref to child form
  @ViewChild('regForm') regForm:UserInputForm;
  
  constructor(    
    private fire: LoginSvc,
    private router: Router    
  ) {
    //debugger
    //console.log("UserRegister...constructor");
  }
  ngOnInit(){
    this.regForm.setMsg({
      status:'',
      msg: this.registerCfg.msg.default,
      error: false 
    });
  }
  /**
   * REGISTER
   */
  onRegister({ email, password }) {
    //console.log("Here we login");
    //debugger 
    //set message 
    this.regForm.setMsg({
      status: "T",
      msg:"Registering ...",
      error: false 
    });
    //show loader
    this.regForm.toggleLoader();      
    //issue register request 
    this.fire.register(email, password)
      .then((d) => {
        //debugger
        console.log("did register");
        //forward now to verify
        this.router.navigate(this.registerCfg.nextNav);
      }, (e) => {
        //set message 
        this.regForm.setMsg({
          status: "F",
          msg: e.message,
          error: true 
        }); 
        //toggle loader
        this.regForm.toggleLoader();
      });
  }
}
