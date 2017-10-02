import { Component, OnInit } from '@angular/core';

import { MdToolbar, MdToolbarRow, MdIcon } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title="Angular 4 material starter"
  constructor() { }

  ngOnInit() {
  }

  getMeFavs(){
    console.log("You clicked favs icon");
  }

  deleteSomething(){
    console.log("Wel there is nothing to delete here");    
  }


}
