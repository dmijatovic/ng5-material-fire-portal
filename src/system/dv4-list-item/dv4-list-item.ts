import { Component, OnInit, Input } from '@angular/core';

import { SysStoreSvc } from '../sys.store';

export interface ListItem {
	key: string;
	items: [{
		key: string;
		title: string;
		type: string;
		required: boolean;
		value: string;
		options?: any
	}],
	commands: [{
		matIcon: string;
		eventKey: string;
		title: string;
		disabled: boolean;
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
	//here we have itemForm data
	//itemForm:any;
	disabled: boolean = true
	constructor(
		private store: SysStoreSvc
	) { }

	ngOnInit() {
		//console.log("ListItemComponent.listItem", this.listItem);
	}
	enableEdit() {
		this.disabled = false;
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
