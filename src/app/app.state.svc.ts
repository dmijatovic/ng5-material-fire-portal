/**
 * CHECK SysStateSvc in system folder!!!
 * This was first idea, but later on 
 * seemed better to have this service 
 * be stored under the system module
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface stateEvent{
   type:string;
   payload?:any;
}

@Injectable()
export class AppStateSvc {
   //local
   _title:string = "Private section";
   //as subject
   //title = new Subject();
   title = new BehaviorSubject<string>(this._title)
   //as observable
   title$ = this.title.asObservable();
   /**
    * Set page title and share with
    * all components listening for title change    
    * @param newTitle 
    */
   setPageTitle(newTitle:string){
      //pass it all that listen
      this.title.next(newTitle);
      //save locally too
      this._title = newTitle;
   }
   /**
    * Get page title from app service
    */
   getPageTitle(){
      return this._title;
   }   
}
