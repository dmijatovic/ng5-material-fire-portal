import { Component, OnInit } from '@angular/core';

import { MatToolbar, MatToolbarRow, MatIcon } from '@angular/material';

import { LoginSvc } from '../../login/login.svc';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title="Angular 4 material starter"
  constructor(
    private login: LoginSvc
  ) { }

  ngOnInit() {
  }

  getMeFavs(){
    console.log("You clicked favs icon");
  }

  deleteSomething(){
    console.log("Wel there is nothing to delete here");    
    //can we log out?!?
    this.login.logOut();
  }


}
