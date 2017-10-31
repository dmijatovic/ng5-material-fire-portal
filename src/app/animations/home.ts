//angular 
import { Component, OnInit } from '@angular/core';

//service to emit/dispatch actions between app components
import { SystemActionSvc } from '../../system/sys.action.svc';

@Component({
    selector: 'app-animate-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class AnimateHomePage implements OnInit {
    pageTitle = 'Animations: Home page';    
    constructor(
        private action: SystemActionSvc
    ){}
    ngOnInit() {
        //pass title we want to use
        this.action.dispatch({
          type:"HEADER_TITLE",
          payload: "dv4Demo portal: " + this.pageTitle
        });
      }
}