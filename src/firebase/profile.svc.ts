//angular
import { Injectable } from '@angular/core';
import {
  Router, ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivate
} from '@angular/router';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//environment
import { environment as env } from '../environments/environment';

@Injectable()
export class ProfileSvc {
  //user object 
  private user: any = null;
  constructor(
    private fire: AngularFireAuth,
    private data: AngularFireDatabase
  ){
    /*
    //listen for auth changes
    this.fire.auth.onAuthStateChanged((user) => {
       if (user) {
          //signed in 
          this.user = user;
       } else {
          //signed out
          this.user = null;
       }
    });*/
  }

  saveProfile(data: any) {
    let uid = btoa(data.email),
      path = env.cfg.firebase.userPath + "/" + uid,
      ref = this.data.database.ref(path);
    
    //save name 
    //debugger
    let user = this.fire.auth.currentUser;
    user.updateProfile({
      displayName: data.firstName + " " + data.lastName,
      photoURL: data.avatar
    })
    .catch((e)=>{
      console.error(e);
    });   
    //add default avatar
    //data['avatar'] = 'assets/img/avatar.png';
    debugger
    return ref.set(data);
  }
}