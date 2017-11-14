//angular
import { Component, OnInit } from '@angular/core';

//service to emit/dispatch actions between app components
import { SystemActionSvc } from '../../system/sys.action.svc';

import {
  pageFadeIn, pageFadeOut, growVertical, growHorizontal,
  itemFade, basicEffect
} from '../../system/system.animate';

@Component({
  selector: 'app-animate-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  animations:[
    pageFadeIn, pageFadeOut, growVertical, growHorizontal,
    itemFade, basicEffect
  ]
})
export class AnimateHomePage implements OnInit {
  pageTitle = 'Animations: Home page';

  //animation variables
  fade:string="";
  basic:string="";


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

  animate(key=null,val=null){
    //debugger
    if (key){
      if (val){
        this[key] = val;
      }else{
        this[key] = key;
      }
    }
  }
}
