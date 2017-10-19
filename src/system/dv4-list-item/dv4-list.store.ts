/*
  Event service to communicate 
  between list components 
  and other components
*/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


interface iStoreAction{
  type:string;
  payload?:any;
}

@Injectable()
export class dv4ListStore {
  constructor(){
    console.log('dv4ListStore...started');
  }
  /**
  * State events from components
  * kind of redux approach without redux?
  */
  private _action:iStoreAction
  private state = new Subject<iStoreAction>();
  state$ = this.state.asObservable();
  dispatch(action:iStoreAction){
    //console.log('LocalStoreTest...dispatch',action);
    this.state.next(action);
    this._action = action;
  }
  getCurrentState(){
    return this._action;
  }
}