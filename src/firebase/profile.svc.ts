//angular
import { Injectable } from '@angular/core';
import {
  Router, ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivate
} from '@angular/router';

//RxJS
import { Observable } from 'rxjs/Observable';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseObjectObservable } from 'angularfire2';

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
    //map use on change state
    this.fire.authState.map((user)=>{
      debugger 
      this.user = user;
    });
  }
  getCurrentProfile():Promise<any>{
    //debugger
    return new Promise((res,rej)=>{      
      let user = this.fire.auth.currentUser
      if (user){
        let path = this.getProfilePath(user.email),
            ref = this.data.database.ref(path);

        ref.on('value',(snapshot)=>{
          res(snapshot.val());
        });

      }else{
        rej("No current user");
      }
    });
  }
  saveProfile(data: any) {
    let path = this.getProfilePath(data.email),
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
    //debugger
    return ref.set(data);
  }
  /**
   * Save avatar only
   * data can be path to image or base64 image string
   * @param data 
   */
  saveAvatar({ email, data }){
    let path = this.getProfilePath(email),
        ref = this.data.database.ref(path);
    //debugger 
    return ref.update({ avatar: data });
  }
  /**
   * Subscribes to avatar image stored in 
   * profile and emits changes to subscriber
   * data is path to image or base64 string
   * @param email 
   */
  avatar(email):Observable<string>{
    //get all references 
    let path = this.getProfilePath(email),
        ref = this.data.database.ref(path + "/avatar");

    return new Observable((observer)=>{
      ref.on('value',(snap)=>{  
        observer.next(snap.val());
      });      
    });
  }
  /**
   * Change profile id to reflect email change
   * first we check for old profile, then copy
   * to new profile and remove old profile
   * @param oldemail 
   * @param newemail 
   */ 
  renameProfile(oldemail,newemail):Promise<boolean>{
    //get path references 
    let oldpath = this.getProfilePath(oldemail),
      newpath = this.getProfilePath(newemail),
      oldref = this.data.database.ref(oldpath);

    return new Promise((res,rej)=>{
      //check if old profile exists
      oldref.once('value')
      .then((data)=>{
        debugger 
        if (data.exists()){
          //get old values 
          let old=data.val();          
          //save as new profile
          return this.saveProfile({
            ...old,
            email:newemail 
          });
        }else{
          //no profile
          res(true);
        }
      })
      .then(()=>{
        debugger 
        //we create new profile
        //delete old profile 
        return this.deleteProfile(oldemail);        
      })
      .then(()=>{
        debugger 
        //we deleted old profile
        //all done
        res(true);
      })
      .catch((e)=>{
        debugger 
        rej(e.message);
      });
    });
  }
  deleteProfile(email):Promise<any>{
    //get path references 
    let path = this.getProfilePath(email),
      ref = this.data.database.ref(path);

    return ref.remove();    
  }
  /**
   * Constructs path to profile data based on email addres
   * profile table based on unique base64 encoded email address
   * @param email
   */
  getProfilePath(email:string){
    let uid = btoa(email),
        path = env.cfg.firebase.userPath + "/" + uid;

    return path;
  }
}