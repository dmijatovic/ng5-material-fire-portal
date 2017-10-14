//angular 
import { Component, OnInit } from '@angular/core';

import { LoginSvc } from '../../login/login.svc';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-header',
   templateUrl: './header.html',
   styleUrls: ['./header.scss'],
   host: {
      'class': 'mat-elevation-z2'
   }
})
export class AppHeader implements OnInit {

   title = 'Header title';

   menuItems: any;
   profileItems: any;

   constructor(
      private login: LoginSvc,
      private router: Router,
      private route: ActivatedRoute
   ) { }
   ngOnInit() {

      this.login.getAllMenuItems()
         .then((d) => {
            //debugger 
            this.menuItems = d;
            return this.login.getAllProfileOptions();
         })
         .then((d) => {
            this.profileItems = d;
         })
         .catch((e) => {
            debugger
            console.error(e);
         });

      this.route.data
         .subscribe((d)=>{
            console.log("header route data", d);
         });

   }

   logOut() {
      //can we log out?!?
      this.login.logOut();
   }
   deleteAccount() {
      this.router.navigate(['remove']);
   }
}