import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { SysStoreSvc } from '../sys.store';
import { Subscription } from 'rxjs/Subscription';

export interface ListItem {
	key: string;	
	items: [{
		key: string;
		title: string;
		type: string;
		required: boolean;
		value: string;
		//show hide placeholder
		//when used in table 
		//set this to false
		placeholder: boolean;
		options?: any
	}],
	commands: [{
		matIcon: string;
		title: string;
		//the event type to send 
		//when button is pressed
		eventKeyStart: string;
		//event type to listen 
		//after operation is completed
		eventKeyEnd: string;
		//is command enabled/disabled
		disabled: boolean;		
		//refrence to ngForm states: pristine, dirty, touched, unoutched
		//the value of state (true/false) will directly be assigned to disabled
		//which is then assiged to button
		//see enableCommands function for more info
		disabledFormState:string;
	}]
}

@Component({
	selector: 'dv4-list-item',
	templateUrl: './dv4-list-item.html',
	styleUrls: ['./dv4-list-item.scss'],
	//DO NOT INCLUDE SysStoreSvc here 
	//because it will inject new instance!!!
	//instead inject SysStoreSvc at module/component
	//you want to communicate with
	//providers: [ SysStoreSvc ]
})
export class ListItemComponent implements OnInit {
	//we pass list item into comp
	@Input() listItem: ListItem
	@ViewChild('itemForm') itemForm;
	//here we have itemForm data
	//itemForm:any;
	disabled: boolean = true
	state$: Subscription;
	constructor(
		private store: SysStoreSvc
	) { }

	ngOnInit() {
		//console.log("ListItemComponent.listItem", this.listItem);
		//listen to status changes on itemForm
		this.itemForm.statusChanges
		.subscribe((d)=>{
			this.enableCommands()
		});
		//listen to save event from communication service
		
		this.state$ = this.store.state$
		.subscribe((action) =>{ 
			//debugger
			if (action.payload && action.payload.key){
				//debugger
				if (action.payload.key==this.listItem.key){
					//call reducer function of this item
					this.reducer(action);
				}
			}			
		});
		
	}
	reducer(action){
		//map action over the command eventKeyEnd		
		//debugger
		this.listItem.commands.map((cmd)=>{			
			//find command to match event type
			debugger 
			if (action.type == cmd.eventKeyEnd){
				//if this command depends on form state				
				if (cmd.disabledFormState){
					//toggle disabled state?!?
					//should be improved
					cmd.disabled = ! cmd.disabled;
				}
			}
		});
	}
	enableEdit() {
		this.disabled = false;
		//console.log(this.itemForm);
	}
	enableCommands(){
		//change disabled state of commands				
		this.listItem.commands.map((cmd)=>{
			//debugger
			if (cmd.disabledFormState){
				//assign current form state prop value to button
				cmd.disabled = this.itemForm[cmd.disabledFormState];
			}
		});	
	}
	sendEvent(eid, data) {
		//log this
		//console.log("Emit event", eid, data);
		//publish event
		this.store.dispatch({
			type:eid,			
			payload:{
				key: this.listItem.key,
				data: data 
			}
		});
	}
}
