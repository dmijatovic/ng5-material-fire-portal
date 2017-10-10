//angular
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, 
    RouterStateSnapshot, CanActivate    
} from '@angular/router';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginSvc implements CanActivate{    
    //user object 
    private user:any = null;

    constructor(
        private fire: AngularFireAuth,
        private router: Router
    ){
        //listen for auth changes
        this.fire.auth.onAuthStateChanged((user)=>{           
            if (user){
                //signed in 
                this.user = user;
            }else{
                //signed out
                this.user = null;
            }
        });
    }
    /**
     * Login user to firebase project
     * @param email 
     * @param pass 
     */
    logIn(email,pass){

        return this.fire.auth
            .signInWithEmailAndPassword(email,pass);

    }
    /**
     * Register user to firebase project
     * @param email 
     * @param pass 
     */
    register(email,pass){

        return this.fire.auth
            .createUserWithEmailAndPassword(email,pass);

    }
    /**
     * Send validation email to currently registered user
     * Ensure the user is logged in at this point because
     * we use user loaded in this class!
     */
    sendEmailVerification(){                
        if (this.user){
            return this.fire.auth.currentUser.sendEmailVerification()
        }else{
            //no user so error 500
            this.router.navigate(['error','500']);
            //throw Error("No user logged in");
        }
    }
    /**
     * Sends reset password email using 
     * firebase auth infrastructure
     * @param email 
     */
    sendResetPasswordEmail(email:string){
        return this.fire.auth.sendPasswordResetEmail(email)
    }
    /**
     * Change current user email
     * This can only if users is logged in
     * @param email 
     */
    changeUserEmail(email:string){
        //can we change this
        return this.fire.auth.currentUser.updateEmail(email);                     
    }
    /**
     * Removes current user from firebase
     */
    removeAccount(){
        return this.fire.auth.currentUser.delete();
    }
    /**
     * Save user profile to this class
     * 
     * @param data 
     */
    saveProfile(data:any){
        this.user = data;        
    }
    /**
     * Return current user profile
     * if no user is logged in 
     * it returns null
     */
    getProfile(){
        return this.user;
    }
    /**
     * Can user activate angular route
     * this function is implemented in angular router     
     * @param next 
     * @param state 
     */
    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        let n = next.data['permission'],
            s = state.url;
        
        //debugger
        //check user 
        if (this.user==null){
            //this.accessDenied(s);
            this.redirectUser("login");
            return false; 
        }else{
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
    accessDenied(url){
        //
        console.log("Access denied to", url);
        //this.router.navigateByUrl("\401");
        this.router.navigate(['error','401']);        
        //return false;
    }
    /**
     * Redirect user to specific page,
     * used after canActivate == false
     * to send user to some other page
     * @param url
     */
    redirectUser(url){
        //        
        console.log("Auth0 redirect to", url);
        
        this.router.navigateByUrl(url);
        
        //return false;
    }

    /**
     * Logs user out of firebase (auth) module
     * After logging out the user property of this class
     * is set to null
     */
    logOut(){
        //remove use 
        this.user = null;
        //logout
        this.fire.auth.signOut()
        .then((d)=>{            
            this.router.navigateByUrl("login");
        },(e)=>{
            this.router.navigateByUrl("error/505");
        });          
    }
}