import { Component, OnInit, Input } from '@angular/core';

export interface ListItem{
   key:string;
   items:[{
      key:string;
      title:string;
      type:string;
      required:boolean;
      value:string;
      options?:any
   }],
   commands:[{
      matIcon:string;
      eventKey:string;
      title:string;
      disabled:boolean;
   }]
}

@Component({
   selector: 'dv4-list-item',
   templateUrl: './dv4-list-item.html',
   styleUrls: ['./dv4-list-item.scss']
})
export class ListItemComponent implements OnInit {
   //we pass list item into comp
   @Input() listItem:ListItem   
   //here we have itemForm data
   //itemForm:any;
   disabled:boolean=true 
   constructor() { 
   }

   ngOnInit() {

      console.log("ListItemComponent.listItem", this.listItem);

   }
   enableEdit(){
      this.disabled=false; 
   }
   sendEvent(eid,data){

      console.log("Emit event", eid, data);

      if (eid=="EDIT"){
         this.disabled = false;
      }else{
         this.disabled = true;
      }

      //and buttons?!? 
      this.listItem.commands.map((i)=>{
         //debugger 
         switch (true){
            case (eid=="EDIT" && i.eventKey=="EDIT"):
               i.disabled == true;
               break;
            case (eid=="EDIT" && i.eventKey=="SAVE"):
               i.disabled == false;
               break;
            case (eid=="EDIT" && i.eventKey=="DELETE"):
               i.disabled == true;
               break;            
            case (eid=="DELETE"):
               i.disabled == true;
               break;
            case (eid=="SAVE" && i.eventKey=="SAVE"):
               i.disabled == true;
               break;
            case (eid=="SAVE" && i.eventKey=="DELETE"):
               i.disabled == false;
               break;
            case (eid=="SAVE" && i.eventKey=="EDIT"):
               i.disabled == false;
               break;
         }
      });
   }
}
