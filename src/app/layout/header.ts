//angular 
import { Component, OnInit } from '@angular/core';

import { LoginSvc } from '../../login/login.svc';
import { AppStateSvc } from "../app.state.svc";
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
   selector: 'app-header',
   templateUrl: './header.html',
   styleUrls: ['./header.scss'],
   host: {
      'class': 'mat-elevation-z2'
   }
})
export class AppHeader implements OnInit {

   title: string = null;
   title$: Subscription;
   menuItems: any;
   profileItems: any;

   constructor(
      private login: LoginSvc,
      private router: Router,
      private route: ActivatedRoute,
      private state: AppStateSvc
   ) { }
   ngOnInit() {
      //list to title
      this.title$ = this.state.title$
         .subscribe((d:any)=>{
            //debugger
            this.title = d;
         });
      //get all menus
      //debugger
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
   }

   logOut() {
      //can we log out?!?
      this.login.logOut();
   }
   deleteAccount() {
      this.router.navigate(['remove']);
   }
}