//angular
import { Injectable } from '@angular/core';
import {
  Router, ActivatedRouteSnapshot,
  RouterStateSnapshot, Route,
  CanActivate, CanLoad
} from '@angular/router';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//enviroment
import { environment as env } from '../environments/environment';
import { SystemActionSvc, ActionType as aType } from '../system/sys.action.svc';

@Injectable()
export class LoginSvc implements CanActivate, CanLoad {
  //user object
  private user: any = null;
  private init:boolean = true;

  constructor(
    private fire: AngularFireAuth,
    private router: Router,
    private data: AngularFireDatabase,
    private action: SystemActionSvc
  ){
    //debugger
    //console.log("LoginSvc...constructor...")
    //init firebase
    this.onInit();
  }
  //listen for auth changes
  onInit(){
    //debugger
    this.fire.auth.onAuthStateChanged((user) => {
      //console.log("onAuthStateChanged...", user);
      if (user) {
        //signed in
        this.user = user;
      } else {
        //signed out
        this.user = null;
      }
      //dispatch action with
      //firebase user after
      if (this.init){
        this.action.dispatch({
          type:aType.FIRE_SVC_START,
          payload: user
        });
        //set init flag to completed
        this.init = false;
      }else{
        this.action.dispatch({
          type:aType.FIRE_USER_CHANGE,
          payload: user
        });
      }
    });
  }
  /**
   * Login user to firebase project
   * @param email
   * @param pass
   */
  logIn(email, pass) {
    //persistance options: local/session/none
    return this.fire.auth.setPersistence(('local'))
      .then(() => {
        return this.fire.auth
          .signInWithEmailAndPassword(email, pass);
      })
      .catch((e)=>{
        //console.error(e);
        throw new Error(e.message);
      });
  }
  /**
   * Returns the start page after user is logged in
   */
  getUserProfile(email: string) {
    return new Promise((res, rej) => {
      if (email) {
        //debugger
        //convert email to b64 encoded string
        let uid = btoa(email),
          path = '/user/' + uid,
          ref = this.data.database.ref(path);
        //request user object ONCE
        ref.once('value')
          .then((snapshot) => {
            /*console.group("getUserProfile");
            console.log("path", path);
            console.log("snaphot", snapshot.exists());
            console.groupEnd();*/
            if (snapshot.exists()) {
              let data = snapshot.val();
              //debugger
              res(data);
            } else {
              res(null);
            }
          }, (e) => {
            rej(e);
          });
      } else {
        res(null);
      }
    });
  }
  /**
   * Returns array of objects of
   * all menu items avaliable in the app
   */
  getAllMenuItems() {
    return new Promise((res, rej) => {

      //debugger
      //convert email to b64 encoded string
      let path = env.cfg.firebase.mainMenuPath,
        ref = this.data.database.ref(path)
          .orderByChild('pos');
      //request user object ONCE
      ref.once('value')
        .then((snapshot) => {
          //console.group("getAllMenuItems");
          //console.log("path", path);
          //console.log("snaphot", snapshot.exists());
          //console.groupEnd();
          let d = [];
          //get list of items
          //ordered by position
          snapshot.forEach(el => {
            let item = el.val();
            if (item['active']) {
              d.push(el.val());
            }
          });
          res(d);
        }, (e) => {
          rej(e);
        });
    });
  }
  /**
   * Returns array of objects of
   * all profile menu items
   */
  getAllProfileOptions() {
    return new Promise((res, rej) => {

      //debugger
      //convert email to b64 encoded string
      let path = env.cfg.firebase.profileMenuPath,
        ref = this.data.database.ref(path)
          .orderByChild('pos');
      //request user object ONCE
      ref.once('value')
        .then((snapshot) => {
          /*console.group("getAllMenuItems");
          console.log("path", path);
          console.log("snaphot", snapshot.exists());
          console.groupEnd();*/
          let d = [];
          //get list of items
          //ordered by position
          snapshot.forEach(el => {
            let item = el.val();
            if (item['active']) {
              d.push(el.val());
            }
          });
          res(d);
        }, (e) => {
          rej(e);
        });

    });
  }
  /**
   * Register user to firebase project
   * @param email
   * @param pass
   */
  register(email, pass) {

    return this.fire.auth
      .createUserWithEmailAndPassword(email, pass);

  }
  /**
   * Send validation email to currently registered user
   * Ensure the user is logged in at this point because
   * we use user loaded in this class!
   */
  sendEmailVerification() {
    return new Promise((res,rej)=>{
      //get current user
      let user = this.fire.auth.currentUser;
      if (user) {
        this.fire.auth.currentUser.sendEmailVerification()
        .then(()=>{
          //debugger
          res(user.email)
        },(e)=>{
          debugger
          rej(e.message);
        })
      } else {
        debugger
        rej("No user logged in");
      }
    });
  }
  /**
   * Sends reset password email using
   * firebase auth infrastructure
   * @param email
   */
  sendResetPasswordEmail(email: string) {
    return this.fire.auth.sendPasswordResetEmail(email)
  }
  /**
   * Change current user email
   * This can only if users is logged in
   * @param email
   */
  changeUserEmail(email: string) {
    //can we change this
    return this.fire.auth.currentUser.updateEmail(email);
  }
  /**
   * Removes current user from firebase
   */
  removeAccount() {
    return this.fire.auth.currentUser.delete();
  }
  /**
   * Save user profile to this class
   *
   * @param data
   */
  saveProfile(data: any) {
    this.user = data;
  }
  /**
   * Return current user profile
   * if no user is logged in
   * it returns null
   */
  getProfile() {
    //debugger
    return this.user;
  }
  /**
   *
   */
  getCurrentUserInfo(){
    //debugger
    return this.fire.auth.currentUser
  }
  /**
   * Can user activate angular route
   * this function is implemented in angular router
   * @param next
   * @param state
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let n = next.data['permission'],
      s = state.url;
    //debugger
    //check user ONLY if login service finished init
    if (this.user == null
      && this.init==false) {
      debugger
      this.accessDenied(s);
      //this.redirectUser("public");
      return false;
    } else {
      return true;
    }

  }
  /**
   * Can user load this module (route)?
   * @param route
   */
  canLoad(route:Route){
    //debugger
    //console.log("canLoad...", route);
    //check user ONLY if login service finished init
    if (this.user == null
      && this.init==false) {
      debugger
      this.accessDenied(route.path);
      //this.redirectUser("public");
      return false;
    } else {
      return true;
    }
  }
  /**
   * Call this function if canActivate function
   * return false, eg. the users has no access
   * to this route and provide url/path the
   * user wanted to access
   * @param url
   */
  accessDenied(url) {
    //
    console.log("Access denied to", url);
    //this.router.navigateByUrl("\401");
    this.router.navigate(['error', '401']);
    //return false;
  }
  /**
   * Redirect user to specific page,
   * used after canActivate == false
   * to send user to some other page
   * @param url
   */
  redirectUser(url) {
    //
    console.log("login.svc redirect to", url);
    this.router.navigateByUrl(url);
    //return false;
  }

  /**
   * Logs user out of firebase (auth) module
   * After logging out the user property of this class
   * is set to null
   */
  logOut() {
    //remove user
    this.user = null;
    //logout
    return this.fire.auth.signOut()
      .then((d) => {
        //this.router.navigateByUrl("public");
        return true
      }, (e) => {
        //unknown error
        //this.router.navigateByUrl("error/505");
        throw new Error(e.mesage);
      });
  }
}
