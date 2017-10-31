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

@Injectable()
export class SystemActionSvc {
   constructor(){
      console.log("SystemActionSvc...started");
   }
   /**
    * State events dispatched from components
    * to whom ever listens to events 
    * inspired by websockets and redux dispatch
    * action idea
    */
   _state:storeEvent;
   state = new Subject<storeEvent>();
   state$ = this.state.asObservable();
   dispatch(event:storeEvent){
      //debugger
      //console.log("SysStoreSvc...dispatch",event);
      //fire up the state event
      this.state.next(event);      
   }
}
/**
 * Redux based action object format
 */
export interface storeEvent{
   type:string;
   payload?:any;
}
