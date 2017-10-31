//angular 
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//RxJs
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
//local
import { environment as env } from '../../environments/environment';
import { LoginSvc } from '../../firebase/login.svc';
import { ProfileSvc } from '../../firebase/profile.svc';
import { SystemActionSvc } from '../../system/sys.action.svc';


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
    private action: SystemActionSvc
  ) { }
  ngOnInit() {
    //list to title
    this.title$ = this.action.state$
      .filter((action)=>{
        //filter only actions with 
        //type header title
        return action.type=="HEADER_TITLE";
      })
      .subscribe((action) => {
        //debugger
        this.title = action.payload;
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