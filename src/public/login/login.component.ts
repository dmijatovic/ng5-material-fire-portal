import { Component, OnInit } from '@angular/core';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//when lazy loading we need service reference here
//import { LoginSvc } from '../../firebase/login.svc';

/**
 * Public signin component that uses app-login 
 * component from login module
 */
@Component({
   selector: 'app-public-signin',
   template: `
    <app-login></app-login>    
  `,
   //styleUrls: ['./signin.component.scss']
   styles: [`
    :host{
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  `]

})
export class SigninComponent implements OnInit {
   constructor(
      //private fire: AngularFireAuth
   ) { }
   ngOnInit() {
      //debugger
      //console.log("Public.SigninComponent...ngOnInit");
   }
}
