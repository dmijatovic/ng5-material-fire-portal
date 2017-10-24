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
export class ProfileSvc {
   //user object 
   private user: any = null;
   constructor(
      private fire: AngularFireAuth,      
      private data: AngularFireDatabase
   ){
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

   saveProfile(data:any){

      let uid = btoa(data.email),
         path = '/user/' + uid,
         ref = this.data.database.ref(path);
      
      debugger 

      return ref.set(data);      
   }

   

}