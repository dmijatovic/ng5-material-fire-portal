import { Injectable } from '@angular/core';

interface iStoreAction{
  type:string;
  payload?:any;
}

@Injectable()
export class ReduxStore {
  //in case we have more than one
  storeId:string;
  //here we store all data
  store:any;
  //here we keep a list of subscribers
  subscribers=[];
  //middleware functions
  middleware=[];
  //reducer function(s)
  reducer:any 
  constructor(){
    console.log('ReduxStore...started');
    this.storeId = new Date().getTime.toString(); 
  }
  /**
   * Initial function to create store
   * @param store 
   * @param reducer 
   */
  createStore(store={},reducer){
    this.store = store;
    this.reducer = reducer;
  }
  /**
   * Get current state of the store
   */
  getState(){
    return this.store;
  }  
  /**
   * Dispatch the methods to reducer function
   */
  dispatch(action:iStoreAction){
    //check for middleware functions 
    /*if (this.middleware.length > 0){
      action = this.applyMiddleware(action);
    }*/
    //dispatch action to reducer
    //and assign new value to store
    this.store = this.reducer(this.store,action);
    //pass new store to subscribers 
    this.subscribers.forEach((subsFunc)=>{
      subsFunc(this.store);
    });
  }
  /**
   * Middleware function should facilitate 
   * 2 paramters store, action, next -> callback
   * @param midFunc 
   */
  use(fn) {
    this.go = ((stack) => (next) => stack(() => fn.call(this, next.bind(this))))(this.go);
  }

  go = (next) => next()
   
  next(store,action){

  }
  subscribe(subsFunc){

    this.subscribers.push(subsFunc);

    //unsubscribe
    return function close(){
      this.subscribers
        .filter(s => s != subsFunc);
    }
  }

  unsubscribe(subsFunc){
    //remove subscriber
    this.subscribers
      .filter(s => s != subsFunc);
  }
}