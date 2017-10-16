//angular 
import { Component } from '@angular/core';

//app state service for changing title
import { AppStateSvc } from '../app.state.svc';

@Component({
    selector: 'app-animate-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class AnimateHomePage {
    title = 'Animations: Home page';    
    constructor(
        private state:AppStateSvc
    ){
        //change page title to reflect loaded page
        this.state.setPageTitle(this.title);
    }
}