
import { Component, OnInit } from '@angular/core';

//service to emit/dispatch actions between app components
import { SystemActionSvc } from '../../../system/sys.action.svc';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle="Chats";
  constructor(
    private action: SystemActionSvc
  ) { }
  ngOnInit() {
    //pass title we want to use
    this.action.dispatch({
      type:"HEADER_TITLE",
      payload: "dv4Demo portal: " + this.pageTitle
    });
  }  
}
