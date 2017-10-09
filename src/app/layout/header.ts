//angular 
import { Component } from '@angular/core';

import { LoginSvc } from '../../login/login.svc';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class AppHeader {
    title = 'Header title';

    constructor(
        private login: LoginSvc,
        private router: Router 
    ){}
    

    logOut(){
        //can we log out?!?
        this.login.logOut();
    }
    deleteAccount(){
        this.router.navigate(['remove']);
    }
}