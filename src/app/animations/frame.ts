//angular 
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-animate-page',
    templateUrl: './frame.html',
    styleUrls: ['./frame.scss']
})
export class AnimateFrame {
    title = 'Animation examples';
    constructor(
        private router:Router
    ){
        //what is in here?
        //console.log(this.router);
    }
}