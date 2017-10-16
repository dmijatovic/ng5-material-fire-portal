//angular 
import { Component } from '@angular/core';

//app state service for changing title
import { AppStateSvc } from '../app.state.svc';

@Component({
    selector: 'app-animate-scroll',
    templateUrl: './scroll.html',
    styleUrls: ['./scroll.scss']
})
export class AnimateScrollPage {
    title = 'Animations: Scroll page';    
    constructor(
        private state:AppStateSvc
    ){
        //change page title to reflect loaded page
        this.state.setPageTitle(this.title);
    }
}