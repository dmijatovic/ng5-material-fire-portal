import { Component, OnInit } from '@angular/core';
import { MatToolbar, MatToolbarRow, MatIcon } from '@angular/material';

//import { Router } from '@angular/router';
//import { LoginSvc } from '../../firebase/login.svc';
import { AppStateSvc } from '../app.state.svc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title="Angular 4 material starter"
  constructor(
    //private login: LoginSvc,
    //private router: Router 
    private state: AppStateSvc
  ) { }

  ngOnInit() {
    //pass title we want to use
    this.state.setPageTitle(this.title);
  }
  /*
  getMeFavs(){
    console.log("You clicked favs icon");
  }
  deleteSomething(){
    console.log("Wel there is nothing to delete here");    
    //can we log out?!?
    this.login.logOut();
  }
  logOut(){
    //can we log out?!?
    this.login.logOut();
  }
  deleteAccount(){
    this.router.navigate(['remove']);
  }*/
}
