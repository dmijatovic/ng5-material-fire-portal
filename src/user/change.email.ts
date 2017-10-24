import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LoginSvc } from '../firebase/login.svc';

@Component({
   selector: 'app-change-email',
   templateUrl: './change.email.html',
   styleUrls: ['./login.scss']
})
export class ChangeEmailComponent implements OnInit {
   pageTitle: string = "Change email";
   pageForm: FormGroup;
   pageStatus: string = "";
   pageMsg: string = "Provide the same email address you used to create the account.";
   primBtn: string = "Change email";
   //loader flag
   showLoader: boolean = false;
   //temp user loaded 
   user: any
   constructor(
      private formBuilder: FormBuilder,
      private fire: LoginSvc
   ) { }

   ngOnInit() {
      this.user = this.fire.getProfile();
      if (this.user) {
         //create form group
         this.pageForm = this.formBuilder.group({
            oldemail: [{ value: this.user.email, disabled: true }, Validators.required],
            newemail: ['', Validators.required]
         });
      } else {
         //create form group
         this.pageForm = this.formBuilder.group({
            oldemail: [{ value: '', disabled: true }, Validators.required],
            newemail: [{ value: '', disabled: true }, Validators.required]
         });

         this.pageStatus = "DISABLED";
         this.pageMsg = "Please login first. We are unable to verify you current email.";
      }
   }

   onChangeEmail() {
      //console.log("reset email");    
      this.pageStatus = "TRYING...";
      this.showLoader = true;
      let cred = this.pageForm.value;
      debugger
      if (this.user.email != cred.newemail) {
         this.fire.changeUserEmail(cred.newemail)
            .then((d) => {
               debugger
               console.log("reset email SEND");

               this.pageStatus = "SUCCESS!";

               this.pageMsg = `
                        We updated your e-mail. However we need to verify that your new email is valid.
                        We send you an email to your new mailbox. You need to open that email and click on the link. 
                        Check your mailbox and follow the instruction in the e-mail we send you.
                        <br><br>
                        Thanks,
                        dv4all team
                    `
               this.showLoader = false;
            }, (e) => {
               this.pageStatus = "FAILED";
               this.pageMsg = e.message;
               console.error("Failed to login", e.message);
               this.showLoader = false;
            });
      }
   }
}
