import { Component, OnInit } from '@angular/core';

import { listOfItems } from './menu.svc'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items = listOfItems

  constructor() { }

  ngOnInit() {
    console.log("ListOfItems", this.items)
  }
}
