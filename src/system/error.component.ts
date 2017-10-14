import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { sysMsg } from './sys.msg';

@Component({
   selector: 'app-error',
   templateUrl: './error.component.html',
   styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

   matIcon: string;
   errTitle: string;
   errMsg: string;
   errNumber: string;

   constructor(
      private route: ActivatedRoute
   ) { }

   ngOnInit() {
      //debugger    
      this.route.params
         .subscribe((p) => {
            //debugger         
            let id = p['id'],
               msg = sysMsg;

            if (msg[id]) {
               this.showError(msg[id]);
            } else {
               this.standardErrorMessage()
            }
         }, (e) => {
            console.error("ErrorComponent:", e);
         });

   }

   showError(err) {
      //debugger
      this.matIcon = err.matIcon;
      this.errTitle = err.title;
      this.errMsg = err.msg;
      this.errNumber = err.id;
   }

   standardErrorMessage() {
      //console.log("standardErrorMessage");
      let err = sysMsg["default"];
      this.matIcon = err.matIcon;
      this.errTitle = err.title;
      this.errMsg = err.msg;
      this.errNumber = "5xx";
   }
}
