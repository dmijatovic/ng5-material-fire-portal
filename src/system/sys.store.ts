/**
 * System store / state manager
 * The idea is to let components communicate 
 * indirectly using system store service rather 
 * then directly calling services and tasks
 * The components will dispatch events and listen 
 * for specific events from the store that will provide
 * them required data
 * v.0.0.1 Oct 2017
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SysStoreSvc {
   constructor(){
      console.log("SysStoreSvc...started");
   }
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
   /**
    * State events from components
    * kind of redux approach without redux?!?
    */
   _state:storeEvent;
   state = new Subject<storeEvent>();
   state$ = this.state.asObservable();
   dispatch(event:storeEvent){
      //debugger
      //console.log("SysStoreSvc...dispatch",event);
      //fire up the state event
      this.state.next(event);
      //save locally
      this._state = event;
   }
   getCurrentState(){
      return this._state;
   }
}


/**
 * Redux based state object format
 */
export interface storeEvent{
   type:string;
   payload?:any;
}
