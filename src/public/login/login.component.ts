import { Component, OnInit } from '@angular/core';

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
  styles:[`
    :host{
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  `]

})
export class SigninComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
