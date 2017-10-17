//angular
import { Injectable } from '@angular/core';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FireSvc {
   //user object 
   private user: any = null;

   constructor(
      private fire: AngularFireAuth,      
      private data: AngularFireDatabase
   ) {
      //listen for auth changes
      this.fire.auth.onAuthStateChanged((user) => {
         if (user) {
            //signed in 
            this.user = user;
         } else {
            //signed out
            this.user = null;
         }
      });
   }
   /**
    * Get list of items at specific path
    * @param path 
    */
   getListOfKeys(path){
      return new Promise((res, rej) => {
         //debugger
         let ref = this.data.database.ref(path)
                        .orderByKey();
         //request user object ONCE
         let d=[];
         //ordered by pos 
         ref.once('value')
         .then((snapshot) => {
            /*console.group("getListOfKeys");
            console.log("path", path);
            console.log("snaphot", snapshot.val());
            console.log("hasChildren", snapshot.hasChildren());
            console.groupEnd();*/

            snapshot.forEach(el => {               
               debugger 
               d.push(el.key)
            });
            //resolve
            res(d);
         },(e) => {
            rej(e);            
         });
      });
   }
   /**
    * Get all items (list of items/object)
    * at specified path, optionally items 
    * can be sorted by child value (ascending)
    * @param path 
    * @param orderBy 
    */   
   getItems(path:string,orderBy:string=null){
      return new Promise((res, rej) => {
         //debugger
         let ref:any, d=[];

         if (orderBy){
            ref = this.data.database.ref(path)
                        .orderByChild(orderBy);
         }else{
            ref = this.data.database.ref(path)
                        .orderByKey();
         }                    
         //ordered by pos 
         ref.once('value')
         .then((snapshot) => {
            /*console.group("getItems");
            console.log("path", path);
            console.log("snaphot", snapshot.val());
            console.log("hasChildren", snapshot.hasChildren());
            console.groupEnd();*/

            snapshot.forEach(el => {               
               //debugger 
               d.push({
                  key: el.key,
                  rawItems:el.val()
               })
            });
            //resolve
            res(d);
         },(e) => {
            rej(e);            
         });
      });
   }
   /**
    * Get schema of specific table
    * @param table 
    */
   getSchema(table:string){
      return new Promise((res, rej) => {
         //debugger
         let path = "/map/" + table,
            ref = this.data.database.ref(path)
                        .orderByChild('pos');   
         //request user object ONCE
         let d=[];
         //ordered by pos 
         ref.once('value')
         .then((snapshot) => {
            /*console.group("getSchema");
            console.log("path", path);
            console.log("snaphot", snapshot.val());
            console.log("hasChildren", snapshot.hasChildren());
            console.groupEnd();*/

            snapshot.forEach(el => {               
               //debugger 
               d.push(el.val());
            });
            //resolve
            res(d);
         },(e) => {
            rej(e);            
         });
      });
   }
   /**
    * Writes data object at speficied path/location
    * It overwrites data at specified path incl. all children!
    * Passing null data will erase data at location!!!
    * @param path 
    * @param data 
    */
   setItems(path:string, data:any){
      return new Promise((res, rej) => {
         debugger
         let ref = this.data.database.ref(path);   
         //set data at location
         ref.set(data)
         .then(() => {            
            //resolve sending 
            //data back
            res(data);
         },(e) => {
            rej(e);            
         });
      });
   } 
}