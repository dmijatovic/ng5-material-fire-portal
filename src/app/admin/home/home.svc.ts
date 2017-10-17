/**
* HOME service
* 
*/
//insert system state service
import { Injectable } from '@angular/core';

import { SysStoreSvc, storeEvent } from '../../../system/sys.store';
import { FireSvc } from '../../../firebase/firebase.svc';

//import { Subject } from 'rxjs/Subject';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription'; 

@Injectable()
export class HomeSvc{   
   constructor(
      private fire:FireSvc,
      private store:SysStoreSvc,      
   ){
      console.log("HomeSvc...started");
      this.onInit();
   }
   //load defined type constants
   //type=EventType;
   //subscribe to events
   state$:Subscription;   
   onInit(){     
      this.state$ = this.store.state$
      .subscribe((e)=>{
         //pass it to reducer
         this.reducer(e);
      });
   } 
   reducer(e:storeEvent){
      console.log("HomeSvcReducer",e.type,e.payload)
      switch(e.type){
         case EventType.GET_SCHEMA:
            this.getSchema(e.payload);
            break;
         case EventType.GET_RAW_DATA:
            this.getData(e.payload);
            break;
         case EventType.PREP_DATA:
            this.prepData(e.payload);
            break;
         case EventType.SORT_DATA:
            this.getData(e.payload);
         case EventType.SET_ITEMS:
            this.setItems(e.payload);
            break;
         case EventType.EDIT:
            //console.log("NOT DEFINED ACTION")
            break;
         case EventType.DELETE:
            this.deleteItem(e.payload);
            break;
      }
   }
   /**
    * Get schema from map table
    * @param table 
    */
   getSchema(table:string){
      //debugger 
      this.fire.getSchema(table)
      .then((d:any)=>{
         //debugger          
         //then get table items 
         if (d.length > 0){
            //emit we have map
            this.store.dispatch({
               type:EventType.SET_SCHEMA,
               payload:{
                  table:table,
                  data: d
               }
            });            
         }else{
            //emit error - no map
            this.store.dispatch({
               type:EventType.ERROR,
               payload:`Table schema missing for [${table}]`
            });
         }
      })
   }
   /**
   * Get data from database (firebase)
   * expects path and orderBy in the payload
   * @param payload.path, payload.orderBy
   */   
   getData({path, orderBy=null}){   
      //debugger    
      //console.log("getData",path, orderBy);      
      //get data
      this.fire.getItems(path,orderBy)
      .then((d)=>{
         this.store.dispatch({
            type:EventType.SET_RAW_DATA,
            payload:{
               table:path,
               data: d
            }
         });
      });
   }  
   /**
    * Map firebase properties 
    * to predefined table schema
    * expected data and shema objects
    * in the payload
    * @param payload
    */ 
   prepData({table, data, schema}){
      //console.log("prepData",data,schema);
      //debugger 
      //clear list
      let itemList=[];        
      
      //map all records we recived 
      data.map((rec)=>{
         //debugger
         let row={}, items=[];
         //extract info for each 
         //key/field/property
         schema.map((field)=>{            
            let item = {
               key: field.key,
               title: field.title,
               type: field.type,
               value: rec.rawItems[field.key],
               required: field.required
            }
            //field description
            items.push(item);
         });
         
         //push complete item 
         itemList.push({
            key: rec.key,
            items: items,
            commands: this.getCommands()
         });
      });

      //return itemList;
      this.store.dispatch({
         type: EventType.SET_DATA,
         payload:{
            table: table,
            data: itemList 
         }
      });
   }
   getCommands(){
      let commands=[];
      //add commands 
      commands.push({
         matIcon:'save',eventKey:EventType.SAVE,title:'Save this thing!!!', disabled:false
      });
      commands.push({
         matIcon:'edit',eventKey:EventType.EDIT,title:'Edit this thing!!!', disabled:false
      });
      commands.push({
         matIcon:'delete',eventKey:EventType.DELETE,title:'Delete this thing!!!', disabled:false
      });
      return commands;
   }
   setItems({path, data}){
      //console.log("saveItem",payload);
      this.fire.setItems(path , data)
      .then((d)=>{
         this.store.dispatch({
            type: EventType.SET_ITEMS_COMPLETED,
            payload: d 
         });
      })
      .catch((e)=>{
         this.store.dispatch({
            type: EventType.ERROR,
            payload: e  
         });
      })
   }
   deleteItem(payload){
      console.log("deleteItem",payload);
   }

}

/**
 * EventType constants
 * used with admin.home
 */
export const EventType={
   SAVE:<string>"SAVE_LIST_ITEM",
   SET_ITEMS:<string>"SET_ITEMS",
   SET_ITEMS_COMPLETED:<string>"SET_ITEMS_COMPLETED",
   EDIT:<string>"EDIT_LIST_ITEM",
   DELETE:<string>"DELETE_LIST_ITEM",
   GET_SCHEMA:<string>"GET_SCHEMA",
   SET_SCHEMA:<string>"SET_SCHEMA",
   GET_RAW_DATA:<string>"GET_RAW_DATA",
   SET_RAW_DATA:<string>"SET_RAW_DATA",
   PREP_DATA:<string>"PREP_DATA",
   SET_DATA:<string>"SET_DATA",
   ERROR:<string>"ERROR",
   SORT_DATA:<string>"SORT_DATA"
}
