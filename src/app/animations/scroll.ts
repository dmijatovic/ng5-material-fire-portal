//angular 
import { Component } from '@angular/core';

//service to emit/dispatch actions between app components
import { SystemActionSvc } from '../../system/sys.action.svc';

@Component({
  selector: 'app-animate-scroll',
  templateUrl: './scroll.html',
  styleUrls: ['./scroll.scss']
})
export class AnimateScrollPage {
  pageTitle = 'Animations: Scroll page';
  constructor(
    private action: SystemActionSvc
  ) { }
  ngOnInit() {
    //pass title we want to use
    this.action.dispatch({
      type: "HEADER_TITLE",
      payload: "dv4Demo portal: " + this.pageTitle
    });
  }
}