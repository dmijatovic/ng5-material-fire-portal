import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { SysStoreSvc } from '../sys.store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dv4-list',
  templateUrl: './dv4-list.html',
  styleUrls: ['./dv4-list.scss']
})
export class dv4List implements OnInit, OnDestroy {
  @Input() itemList:any = [];  
  @Input() //listen to state changes from parent
  set state(action:any){
    console.log("dv4List...action...",action);
  }
  state$:Subscription;
  constructor(
    private store:SysStoreSvc
  ){}
  ngOnInit(){
    /*
    this.state$ = this.store.state$
      .subscribe((d)=>{
        this.reducer(d);
      }); 
    */
  }
  reducer(action){
    switch(action.type){
      case "TEST":

    }
  }
  ngOnDestroy(){}
  addItem(){
    console.log("Add item");
  }
}