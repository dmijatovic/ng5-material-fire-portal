import { Component } from '@angular/core';
import { Router } from '@angular/router';
/**
 * MAIN OUTLET component
 * this component is first component 
 * on the page, IT is simply a router outlet 
 * for other modules. Note that other module 
 * also might have router-outlets. This one 
 * is TOP LEVEL router-outlet to split 
 * public, private and login sections/modules
 */
@Component({
  selector: 'main-outlet',
  template: ` 
    <router-outlet></router-outlet>
  `,  
  styles:[` 
    :host{
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height:100%;
    }
  `]
})
export class MainOutlet {
  constructor(private router:Router){
    //what is in here?
    console.log(this.router)
  }
}
