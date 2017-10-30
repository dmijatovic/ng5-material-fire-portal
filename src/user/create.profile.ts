//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { LoginSvc } from '../firebase/login.svc';
import { ProfileSvc } from '../firebase/profile.svc';
//default avatar
import { environment as env } from '../environments/environment'
//page definitions from user.cfg file 
import { CreateProfileCfg } from './user.cfg';
import { UserInputForm } from './user.input.form';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create.profile.html',
  //styleUrls: ['./register.scss']
  providers:[ ProfileSvc ]
})
export class UserCreateProfile implements OnInit {  
  //config
  profileCfg = CreateProfileCfg;
  //ref to child form
  @ViewChild('profileForm') profileForm:UserInputForm;

  email:string;
  createDate: string = new Date().toISOString();
  avatar = env.cfg.defaultAvatar;
  menuItems = [];
  
  constructor(    
    private login: LoginSvc,
    private profile: ProfileSvc,
    private router: Router
  ) {
    //debugger
    //console.log("UserRegister...constructor");
  }
  ngOnInit(){
    //get email 
    this.email = this.getEmail();      
    this.getMenuItems();

    if (this.email){
      this.profileForm.setMsg({
        status:'',
        msg: this.profileCfg.msg.default,
        error: false 
      });
      //define buttons 
      this.profileCfg.secoBtn={
        label:'Remove account',link:'../remove'
      }
      this.profileCfg.thrdBtn={
        label:null,link:null
      }
    }else{
      //change buttons 
      this.profileCfg.secoBtn={
        label:null,link:null 
      }
      this.profileCfg.thrdBtn={
        label:"Sign in",link:'/user/login'
      }
      //no user email - error - hide form
      this.profileForm.hideForm=true;
      //show error message
      this.profileForm.setMsg({
        status:'',
        msg: this.profileCfg.msg.login,
        error: true
      });
    } 
  }
  getEmail() {
    try {
      let email = this.login.getProfile().email;
      return email;
    } catch (e) {
      //console.error(e);
      return null
    }
  }
  getMenuItems() {
    //let d=[];
    this.login.getAllMenuItems()
      .then((d: any) => {
        //console.log(d);
        //debugger
        this.menuItems = d;
      });
  }
  /**
   * REGISTER
   */
  onCreateProfile(data) {
    //console.log("Here we login");
    //debugger 
    //set message 
    this.profileForm.setMsg({
      status: "T",
      msg:"Creating ...",
      error: false 
    });
    //show loader
    this.profileForm.toggleLoader();
    //enrich data with additional info
    let profile = this.enrichData(data);
    
    //issue register request 
    this.profile.saveProfile(profile)
      .then(() => {
        //debugger        
        //custom start page
        this.router.navigate([profile.startpage]);                
      }, (e) => {
        //set message 
        this.profileForm.setMsg({
          status: "F",
          msg: e.message,
          error: true 
        }); 
        //toggle loader
        this.profileForm.toggleLoader();
      });
  }
  enrichData(data){    
    return {
      ...data,
      createDate: this.createDate,
      email: this.email,
      avatar: this.avatar,
      startpage: env.cfg.startPage,
      birthCity: null,
      birthDate: null
    }
  }
}
