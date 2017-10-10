import { Component, OnInit } from '@angular/core';
import { MatToolbar, MatToolbarRow, MatIcon } from '@angular/material';


@Component({
  selector: 'app-home-public',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePublic implements OnInit {
  title="Angular 4 material starter"
  constructor(
    //private login: LoginSvc,
    //private router: Router 
  ) { }

  ngOnInit() {
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
