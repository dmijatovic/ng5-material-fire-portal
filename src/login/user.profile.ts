//angular 
import { Component, OnInit } from '@angular/core';
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user.profile.html',
    styleUrls: ['./login.component.scss','./user.profile.scss']
})
export class UserProfilePage implements OnInit {
    
    title = 'Create user profile';

    user:any;
    
    pages=['page1','page2','page3']; 
    
    constructor(){
        
    }
    ngOnInit(){

    }
}