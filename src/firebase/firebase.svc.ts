//angular
import { Injectable } from '@angular/core';
import {
   Router, ActivatedRouteSnapshot,
   RouterStateSnapshot, CanActivate
} from '@angular/router';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FireSvc implements CanActivate {
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
   }
   /**
    * Get list of items at specific path
    * @param path 
    */
   getListOfKeys(path){
      return new Promise((res, rej) => {
         //debugger
         let ref = this.data.database.ref(path)
                        .orderByKey();
         //request user object ONCE
         let d=[];
         //ordered by pos 
         ref.once('value')
         .then((snapshot) => {
            console.group("getListOfItems");
            console.log("path", path);
            console.log("snaphot", snapshot.val());
            console.log("hasChildren", snapshot.hasChildren());
            console.groupEnd();

            snapshot.forEach(el => {               
               debugger 
               d.push(el.key)
            });
            //resolve
            res(d);
         },(e) => {
            rej(e);            
         });
      });
   }
   /**
    * 
    * @param path 
    * @param orderBy 
    */   
    getItems(path:string,orderBy:string=null){
      return new Promise((res, rej) => {
         //debugger
         let ref:any, d=[];

         if (orderBy){
            ref = this.data.database.ref(path)
                        .orderByChild(orderBy);
         }else{
            ref = this.data.database.ref(path)
                        .orderByKey();
         }                    
         //ordered by pos 
         ref.once('value')
         .then((snapshot) => {
            console.group("getListOfItems");
            console.log("path", path);
            console.log("snaphot", snapshot.val());
            console.log("hasChildren", snapshot.hasChildren());
            console.groupEnd();

            snapshot.forEach(el => {               
               //debugger 
               d.push({
                  key: el.key,
                  rawItems:el.val()
               })
            });
            //resolve
            res(d);
         },(e) => {
            rej(e);            
         });
      });
   }
   /**
    * Get schema of specific table
    * @param table 
    */
    getSchema(table:string){
      return new Promise((res, rej) => {
         //debugger
         let path = "/map/" + table,
            ref = this.data.database.ref(path)
                        .orderByChild('pos');   
         //request user object ONCE
         let d=[];
         //ordered by pos 
         ref.once('value')
         .then((snapshot) => {
            console.group("getSchema");
            console.log("path", path);
            console.log("snaphot", snapshot.val());
            console.log("hasChildren", snapshot.hasChildren());
            console.groupEnd();

            snapshot.forEach(el => {               
               //debugger 
               d.push(el.val());
            });
            //resolve
            res(d);
         },(e) => {
            rej(e);            
         });
      });
   }
   /**
    * Login user to firebase project
    * @param email 
    * @param pass 
    */
   logIn(email, pass) {

      return this.fire.auth
         .signInWithEmailAndPassword(email, pass);

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
         let path = '/menu/',
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
         let path = '/menu/',
            ref = this.data.database.ref(path)
                      .orderByChild('pos');
         //request user object ONCE
         ref.once('value')
            .then((snapshot) => {
               /*console.group("getAllMenuItems");
               console.log("path", path);
               console.log("snaphot", snapshot.exists());
               console.groupEnd();*/
               if (snapshot.exists()) {
                  let data = snapshot.val(),
                     keys = Object.keys(data),
                     d = [];
                  //convert to array
                  //of objects
                  //filter only active! 
                  keys.map((i) => {
                     if (data[i]['active']==true){
                        d.push(data[i]);
                     }
                  });
                  res(d);
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
    * all profile menu items 
    */
    getAllProfileOptions() {
      return new Promise((res, rej) => {

         //debugger
         //convert email to b64 encoded string
         let path = '/profile/',
            ref = this.data.database.ref(path)
                      .orderByChild('pos');
         //request user object ONCE
         ref.once('value')
            .then((snapshot) => {
               /*console.group("getAllMenuItems");
               console.log("path", path);
               console.log("snaphot", snapshot.exists());
               console.groupEnd();*/
               if (snapshot.exists()) {
                  let data = snapshot.val(),
                     keys = Object.keys(data),
                     d = [];
                  //convert to array
                  //of objects
                  //filter only active! 
                  keys.map((i) => {
                     if (data[i]['active']==true){
                        d.push(data[i]);
                     }
                  });
                  res(d);
               } else {
                  res(null);
               }
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

      //debugger
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
      //remove use 
      this.user = null;
      //logout
      this.fire.auth.signOut()
         .then((d) => {
            this.router.navigateByUrl("public");
         }, (e) => {
            this.router.navigateByUrl("error/505");
         });
   }
}