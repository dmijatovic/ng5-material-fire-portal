//angular 
import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'app-public-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class AppPublicHeader {

    title = 'Angular 4 Firebase demo portal';

    constructor(        
        private router: Router 
    ){}
    

    logIn(){
        //can we log out?!?
        //this.login.logOut();
    }
    deleteAccount(){
        this.router.navigate(['remove']);
    }
}