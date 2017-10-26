import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSvc } from '../firebase/login.svc';

@Component({
   selector: 'app-remove-account',
   templateUrl: './remove.account.html',
   styleUrls: ['./login.scss']
})
export class RemoveAccountComponent implements OnInit {
   pageTitle: string = "Delete account";
   pageForm: FormGroup;
   pageStatus: string = "";
   pageMsg: string = "Note that this action will delete your account.";
   primBtn: string = "Delete account";
   //loader flag
   showLoader: boolean = false;
   //temp user loaded 
   email: string = null;
   
   @ViewChild('expPanel') expPanel

   constructor(
      private formBuilder: FormBuilder,
      private fire: LoginSvc,
      private router: Router
   ) { }

   ngOnInit() {

      let user = this.fire.getProfile();
      if (user) {
         this.email = user.email;
         //create form group
         this.pageForm = this.formBuilder.group({
            email: [{ value: this.email, disabled: true }, Validators.required],
            password: ['', Validators.required]
         });
      } else {

         //create form group
         this.pageForm = this.formBuilder.group({
            email: [{ value: '', disabled: true }, Validators.required],
            password: [{ value: '', disabled: true }, Validators.required]
         });
         this.pageStatus = "DISABLED";
         this.pageMsg = "Please login first. We are unable to verify you current email.";

         //navigate 
         this.router.navigate(['error', '401']);
      }
   }
   /**
    * Started by button
    */
   onRemoveAccount() {
      console.log("remove account");    
      this.pageStatus = "TRYING...";
      this.showLoader = true;
      let cred = this.pageForm.value;
      //debugger
      //sign in again 
      this.fire.logIn(this.email, cred.password)
         .then(() => {
            //we are logged in
            //debugger
            //lets remove account
            return this.fire.removeAccount()
         })
         .then((d) => {
            //debugger
            //show message
            this.removedAccount();
         })
         .catch((e) => {
            debugger
            this.pageStatus = "FAILED";
            this.pageMsg = e.message;
            console.error("Failed to login", e.message);
            this.showLoader = false;
         });
   }
   /**
    * We call firebase auth delete user
    */
   removedAccount() {
      console.log("User removed");
      this.pageStatus = "DONE!";
      this.pageMsg = `
      We deleted your account. Sorry to see you leaving. Till next time!
      <br><br>
      Regards,
      dv4all team
      `
      this.email = null;
      this.showLoader = false;      
      this.expPanel.open();      
      //console.log(this.expPanel);
   }
   /**
    * Go back to previous page using history
    */
   goBack(){
      //just go back
      window.history.back();
   }
}
