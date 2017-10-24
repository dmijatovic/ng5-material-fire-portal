//angular
import { Injectable } from '@angular/core';
import {
  Router, ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivate
} from '@angular/router';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//enviroment
import { environment as env } from '../environments/environment';


@Injectable()
export class LoginSvc implements CanActivate {
  //user object 
  private user: any = null;

  constructor(
    private fire: AngularFireAuth,
    private router: Router,
    private data: AngularFireDatabase
  ) {
    //listen for auth changes
    this.fire.auth.onAuthStateChanged((user) => {
      if (user) {
        //signed in 
        this.user = user;
      } else {
        //signed out
        this.user = null;
      }
    });
    //debugger
    //check if we have user signed to firebase
    //login.svc is split between user and app
    //in other words
    if (this.fire.auth.currentUser && this.user==null){
      this.user = this.fire.auth.currentUser; 
    }      
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
        console.error(e);
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
   * Returns list of all menu items of the app
   */
  getListofAllMenuItems() {
    return new Promise((res, rej) => {

      //debugger

      let path = env.cfg.firebase.mainMenuPath,
        ref = this.data.database.ref(path)
          .orderByChild('pos');

      //request user object ONCE
      //ordered by pos 
      ref.once('value')
        .then((snapshot) => {
          /*console.group("getAllMenuItems");
          console.log("path", path);
          console.log("snaphot", snapshot.exists());
          console.groupEnd();*/
          if (snapshot.exists()) {
            let data = snapshot.val();
            res(Object.keys(data));
          } else {
            res(null);
          }
        }, (e) => {
          rej(e);
        });

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
    if (this.user) {
      return this.fire.auth.currentUser.sendEmailVerification()
    } else {
      //no user so error 500
      this.router.navigate(['error', '500']);
      //throw Error("No user logged in");
    }
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
    return this.user;
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

    debugger
    //check user 
    if (this.user == null) {
      this.accessDenied(s);
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