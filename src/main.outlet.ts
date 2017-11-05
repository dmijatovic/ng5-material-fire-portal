import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Check Firebase init and user login
 * we need all three services stated below
 * LoginSvc is initialized here and will
 * connect to firebase using FirebaseModule settings
 * Note! LoginSvc needs to be injected here in order to start
 * After connecting to Firebase service will dispatch action
 * and this component will pick it up
 */
import {
  SystemActionSvc, ActionType as aType,
} from './system/sys.action.svc';
import { LoginSvc } from './firebase/login.svc';
import { ProfileSvc } from './firebase/profile.svc';
import { Subscription } from 'rxjs/Subscription';
import { sysUtil as util } from './system/sys.cfg';

//enviroment variables
import { environment as env } from './environments/environment';
/**
 * MAIN OUTLET component
 * this component is first component
 * on the page, IT is simply a router outlet
 * for other modules. Note that other module
 * also might have router-outlets. This one
 * is TOP LEVEL router-outlet to split
 * public, private and login sections/modules
 */
@Component({
  selector: 'main-outlet',
  template: `
    <app-loader *ngIf="loading"
      class="active"></app-loader>
    <router-outlet *ngIf="!loading"></router-outlet>
  `,
  styles:[`
    :host{
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height:100%;
    }
  `],
  providers:[ ProfileSvc ]
})
export class MainOutlet implements OnInit {
  loading:boolean=true;
  action$:Subscription;
  constructor(
    private login:LoginSvc,
    private action:SystemActionSvc,
    private router:Router,
    private profile: ProfileSvc
  ){}
  ngOnInit(){
    //what is in router?
    //console.log("MainOutlet.ngOnInit...router...", this.router)
    //we need to listen/wait
    //on FIREBASE login service
    this.action$ = this.action.state
    .filter((a) =>{
      //we are only interested in start of fire
      return a.type==aType.FIRE_SVC_START
    })
    .subscribe((a) =>{

      let user = a.payload,
          path = util.getRelativeUrl();

      if (user){
        this.navigateUser({user, path});
      }else{
        //no user
        this.navigateNonUser(path);
      }
    });
  }
  /**
   * This is top level user authentication check
   * at this level only logged in / NOT is relevant
   * specific routes are validated further
   * @param user
   */
  navigateUser({user, path}){
    //we have user
    //debugger
    if (env.production===false){
      console.log("User wants to...", path);
    }
    if (path==="/" || path == env.cfg.loginPage ){
      //get user profile
      this.profile.getCurrentProfile()
        .then((profile)=>{
          if (profile && profile.startpage){
            //we have user
            this.router.navigate([profile.startpage]);
          }else{
            //default startpage
            this.router.navigate([env.cfg.startPage]);
          }
          //remove loading flag
          this.loading = false;
        })
    }else{
      //do we need to do this?!?
      //or just do nothing
      this.router.navigate([path]);
      //remove loading flag
      this.loading = false;
    }
  }
  navigateNonUser(path){
    //no user
    //debugger
    if (env.production==false){
      console.log("NonUser wants to...", path);
    }
    //let them try?!?
    if (path==="/"){
      this.router.navigate([env.cfg.loginPage]);
    }else{
      this.router.navigate([path]);
    }
    //remove loading flag
    this.loading = false;
  }
  ngOnDestroy(){
    if (this.action$){
      this.action$.unsubscribe();
    }
  }
}
