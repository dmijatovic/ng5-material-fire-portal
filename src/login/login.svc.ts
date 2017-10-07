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

    logIn(email,pass){

        return this.fire.auth
            .signInWithEmailAndPassword(email,pass);

    }
        
    register(email,pass){

        return this.fire.auth
            .createUserWithEmailAndPassword(email,pass);

    }

    saveProfile(data:any){
        this.user = data;        
    }

    getProfile(){
        return this.user;
    }

    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        let n = next.data['permission'],
            s = state.url;
        
        debugger
        //check user 
        if (this.user==null){
            //this.accessDenied(s);
            this.redirectUser("login");
            return false; 
        }else{
            return true;
        }
    }

    accessDenied(url){
        //
        console.log("Access denied to", url);

        //this.router.navigateByUrl("\401");
        this.router.navigate(['error','401']);
        
        //return false;
    }
    redirectUser(url){
        //        
        console.log("Auth0 redirect to", url);
        
        this.router.navigateByUrl(url);
        
        //return false;
    }


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