import { Component, OnInit } from '@angular/core';

import { FireSvc } from '../../../firebase/firebase.svc'
//import environment variables
import { environment } from '../../../environments/environment';

//use snackbar
import { MatSnackBar } from '@angular/material';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss'],
   providers: [ FireSvc ]
})
export class HomeComponent implements OnInit {
   pageTitle:string="Admin panel"
   panelTitle:string="Definitions";

   //temp array of tables 
   tables=environment.cfg.admin.items;
   //list of items according to dv4-list-item format
   itemList:any=[];
   //this is table map
   itemMap:any=[];

   activeTable:string=null;

   loader:boolean=false;

   constructor(
      private fire:FireSvc,
      private snack:MatSnackBar
   ) { }

   ngOnInit() {
     
   }
   /**
    * Load list/table from firebase
    * @param tid 
    */
   loadTable(tid){
      console.log("load table ", tid);
      //show loader
      this.loader = true;
      //let schema:any;

      //get table map first 
      this.fire.getSchema(tid)
      .then((d:any)=>{
         //debugger          
         //then get table items 
         if (d.length > 0){
            //update item map
            this.itemMap = d;
            return this.fire.getItems(tid);
         }else{            
            throw new Error("Table schema missing for [" + tid + "]");
         }
      })   
      .then((d:any)=>{
         //debugger
         //this.tables = d;
         this.itemList = this.mapList(d,this.itemMap);         
         //set this table to be active
         this.activeTable = tid;
         //hide loader 
         this.loader = false;
      })
      .catch((e)=>{
         console.error(e);
         //debugger
         this.showErrMsg(e.message);
         this.loader = false;
      });      
   }
   /**
    * Map firebase properties 
    * to predefined table schema
    * @param data 
    * @param schema 
    */
   mapList(data:any, schema:any){
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
            commands: this.addCommands()
         });
      });

      return itemList;
   }
   addCommands(){
      let commands=[];
      //add commands 
      commands.push({
         matIcon:'save',eventKey:'SAVE',title:'Save this thing!!!', disabled:false
      });
      commands.push({
         matIcon:'edit',eventKey:'EDIT',title:'Edit this thing!!!', disabled:false
      });
      commands.push({
         matIcon:'delete',eventKey:'DELETE',title:'Delete this thing!!!', disabled:false
      });
      return commands;
   }
   /* not used 
   getType(val:any){      
      //debugger 
      if (!val) return "text";
      
      if(typeof(val) === "boolean"){
         return "boolean";
      }

      if (!isNaN(parseFloat(val))){
         return "number";
      }
      //else always text
      return "text";
   }*/
   /**
    * Queries firetable again with new sort 
    * selected from dropdown
    * @param sortBy 
    */
   sortTable(sortBy:string){
      console.log("sort table", sortBy);

      this.loader = true;
      //select again;
      return this.fire.getItems(this.activeTable, sortBy)
      .then((d)=>{
         //this.tables = d;
         this.itemList = this.mapList(d,this.itemMap);   
         //hide loader
         this.loader = false;
      })
      .catch((e)=>{
         console.error(e);
         this.loader = false;
      });
   }
   /**
    * Show snackbar popup with error message
    * @param errMsg 
    */
   showErrMsg(errMsg:string){
      let config = 
      this.snack.open(errMsg,"OK",{
         extraClasses:["error-msg-snack"]
      });
   }
   createTable(){
      console.log("create new table");
   }
   addRow(){
      console.log("Create new row");
   }
}
