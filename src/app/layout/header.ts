//angular 
import { Component, OnInit } from '@angular/core';

import { LoginSvc } from '../../login/login.svc';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class AppHeader implements OnInit {
    title = 'Header title';
    
    menuItems:any;

    constructor(
        private login: LoginSvc,
        private router: Router 
    ){}
    ngOnInit(){
        this.login.getAllMenuItems()
        .then ((d)=>{
            //debugger 
            this.menuItems = d;
        })
        .catch((e)=>{
            debugger 
            console.error(e);
        });
    }

    logOut(){
        //can we log out?!?
        this.login.logOut();
    }
    deleteAccount(){
        this.router.navigate(['remove']);
    }
}