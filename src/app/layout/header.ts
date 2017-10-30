//angular 
import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoginSvc } from '../../firebase/login.svc';
import { ProfileSvc } from '../../firebase/profile.svc';
import { AppStateSvc } from "../app.state.svc";
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  host: {
    'class': 'mat-elevation-z2'
  }
})
export class AppHeader implements OnInit {
  title: string = null;
  title$: Subscription;
  menuItems: any;
  profileItems: any;
  displayName:string;
  avatar:string = env.cfg.defaultAvatar;
  avatar$:Observable<string>;

  constructor(
    private login: LoginSvc,
    private profile: ProfileSvc,
    private router: Router,
    private route: ActivatedRoute,
    private state: AppStateSvc
  ) { }
  ngOnInit() {
    //list to title
    this.title$ = this.state.title$
      .subscribe((d: any) => {
        //debugger
        this.title = d;
      });
    //get all menus
    //debugger
    this.login.getAllMenuItems()
      .then((d) => {
        //debugger
        this.menuItems = d;
        return this.login.getAllProfileOptions();
      })
      .then((d) => {
        this.profileItems = d;
      })
      .catch((e) => {
        debugger
        console.error(e);
      });
    //get avatar image and display name 
    //debugger
    if (this.login.getCurrentUserInfo()){
      this.displayName = this.login.getCurrentUserInfo().displayName;
      /*if (this.login.getCurrentUserInfo().photoURL){
        this.avatar = this.login.getCurrentUserInfo().photoURL; 
      }*/
      //subscribe to avatar stream 
      this.avatar$ = this.profile.avatar(this.login.getCurrentUserInfo().email);
      this.avatar$.subscribe((d)=>{
        //debugger
        //console.log("avatar changed");
        this.avatar = d;
      });
    }
  }

  logOut() {
    //can we log out?!?
    this.login.logOut();
  }
  
  deleteAccount() {
    this.router.navigate(['remove']);
  }  
}