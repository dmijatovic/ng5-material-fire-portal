//angular 
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, 
    RouterStateSnapshot, CanActivate    
} from '@angular/router';


@Injectable()
export class AuthService implements CanActivate{    
    //canActivate:boolean=false;
    user:any = null;

    constructor(
        private router:Router
        //,private userSvc:AppUserService
    ){}

    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        if (this.user==null){
            return false;
        }else{
            return true;
        }
    }

    reject(url){
        //
        console.log("Access denied to", url);

        //this.router.navigateByUrl("\401");
        this.router.navigate(['401']);
        
        return false;
    }
    redirect(url){
        console.log("Auth0 redirect to", url);
        
        this.router.navigateByUrl(url);
        
        return false;
    }
}