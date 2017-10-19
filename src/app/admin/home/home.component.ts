//angular
import { Component, OnInit, OnDestroy } from '@angular/core';
//services 
//SysStateSvc is declared in app.module as service provider
import { SysStoreSvc, storeEvent } from '../../../system/sys.store';
//HomeSvc depends on FireSvc which is injected in app.module as service
import { HomeSvc, EventType as event } from './home.svc';
//import environment variables
import { environment } from '../../../environments/environment';
//RxJs
import { Subscription } from 'rxjs/Subscription';
//use snackbar, 
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeSvc]
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle: string = "Admin panel"
  panelTitle: string = "Definitions";
  //temp array of tables 
  tables = environment.cfg.admin.items;
  //list of items according to dv4-list-item format
  itemList: any = [];
  //this is table map
  itemMap: any = [];
  activeTable: string = null;
  loader: boolean = false;
  state$: Subscription;
  //this variable is used 
  //to share actions to 
  //child components
  stateAction:storeEvent;

  constructor(
    private store: SysStoreSvc,
    private homeSvc: HomeSvc,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.state$ = this.store.state$
      .subscribe((e) => {
        //pass event to reducer
        this.reducer(e);
      });
  }
  /**
   * This is main reducer function 
   * for this component. ALL events 
   * are distributed from here
   * stateAction is used to distribute
   * actions to child components
   * @param e
   */
  reducer(e: storeEvent) {
    console.log("HomeComponentReducer:", e.type, e.payload);
    switch (e.type) {
      case event.GET_SCHEMA:
        //activate loader
        this.loader = true;
        break;
      case event.SET_SCHEMA:
        //save item map
        this.setSchema(e.payload);
        break;
      case event.GET_RAW_DATA:
        //do nothing here             
        break;
      case event.SET_RAW_DATA:
        //do nothing here 
        this.setRawData(e.payload);
        break;
      case event.SET_DATA:
        //ok now we have prepared data
        this.setData(e.payload);
        //pass to child 
        this.stateAction = e;
        break;
      case event.SET_ITEMS_COMPLETED:
        //ok now we have prepared data
        //this.setData(e.payload);
        //pass to child 
        this.stateAction = e;
        break;
      case event.SAVE:
        //ok now we have prepared data
        this.saveRow(e.payload);
        break;
      case event.ERROR:
        //hide loader adn show error popup
        this.loader = false;
        this.showErrMsg(e.payload);
        break;      
      case event.PREP_DATA:
        break;
    }
  }
  /**
   * Load list/table from firebase
   * @param tid 
   */
  loadTable(tid) {
    //console.log("load table ", tid);
    //it starts with loading table schema
    //see further flow at SET_SCHEMA
    this.store.dispatch({
      type: event.GET_SCHEMA,
      payload: tid
    });
  }
  /**
   * Save table schema/map
   * @param param0 
   */
  setSchema({ table, data }) {
    if (data) {
      //save item map
      this.itemMap = data;
      //get data items now 
      //this event is catched by 
      //getData function in service
      this.store.dispatch({
        type: event.GET_RAW_DATA,
        payload: {
          path: table
        }
      });
      //}else{
      //   this.itemMap=null;
    }
  }
  /**
   * We received raw data from service
   * and we pass request for preparation
   * @param param0 
   */
  setRawData({ table, data }) {
    if (data && this.itemMap) {
      //we have raw data now map it for component 
      this.store.dispatch({
        type: event.PREP_DATA,
        payload: {
          table: table,
          data: data,
          schema: this.itemMap
        }
      });
    }
  }
  /**
   * 
   * @param param0 
   */
  setData({ table, data }) {
    if (data) {
      this.activeTable = table;
      this.itemList = data;
      //hide loader now
      this.loader = false;
    }
  }
  /**
   * Query firetable again with new sort 
   * selected from dropdown
   * @param sortBy 
   */
  sortTable(orderBy: string) {
    //console.log("sort table", orderBy);
    this.loader = true;
    this.store.dispatch({
      type: event.GET_RAW_DATA,
      payload: {
        path: this.activeTable,
        orderBy: orderBy
      }
    });
  }
  saveRow({ key, data }) {
    // we need to add table name to this
    //debugger    
    //emit new event 
    this.store.dispatch({
      type: event.SET_ITEMS,
      payload: {
        table: this.activeTable,
        item: key,
        data: data
      }
    });
  }
  /**
   * Show snackbar popup with error message
   * @param errMsg 
   */
  showErrMsg(errMsg: string) {
    let config =
      this.snack.open(errMsg, "OK", {
        extraClasses: ["error-msg-snack"]
      });
  }
  createTable() {
    console.log("create new table");
  }
  addRow() {
    console.log("Create new row");
  }
  ngOnDestroy() {
    if (this.state$) {
      this.state$.unsubscribe();
    }
  }
}
