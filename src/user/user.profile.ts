//angular 
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { environment as env } from '../environments/environment';
import { LoginSvc } from '../firebase/login.svc';
import { ProfileSvc } from '../firebase/profile.svc';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user.profile.html',
  styleUrls: ['./login.scss', './user.profile.scss'],
  providers: [ProfileSvc]
})
export class UserProfilePage implements OnInit {

  title = 'Your profile';
  profileForm: FormGroup;
  pages = [];
  showLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private user: LoginSvc,
    private data: ProfileSvc,
    private router: Router
  ){}
  ngOnInit() {
    //get email 
    let eml = this.getEmail(),
      createDate = new Date().toISOString(),
      avatar = env.cfg.defaultAvatar;
    //get metnu items 
    this.getMenuItems();
    //debugger 
    this.profileForm = this.fb.group({
      email: [eml, Validators.required],
      createDate: [createDate, Validators.required],
      avatar: [avatar, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      companyName: [null],
      jobTitle: [null],
      birthDate: [null],
      birthCity: [null],
      startpage: [null, Validators.required],
    });
  }
  getEmail() {
    try {
      let email = this.user.getProfile().email;
      return email;
    } catch (e) {
      console.error(e);
      return null
    }
  }
  getMenuItems() {
    this.user.getAllMenuItems()
      .then((d: any) => {
        //console.log(d);
        //debugger
        this.pages = d;
      });
  }
  onSubmit(data) {
    //console.log("save profile", data);

    this.data.saveProfile(data)
      .then(() => {
        debugger
        //console.log();
        //forward to start page 
        this.router.navigate([data.startpage]);
      }, (e) => {
        //debugger 
        console.error(e);
      });
  }
}