//angular
import { Component, OnInit } from '@angular/core';

//material
import { MatSnackBar } from '@angular/material';

//services
import { ProfileSvc } from '../../../firebase/profile.svc'
import { mapProfile } from './profile.fields';


@Component({
  selector: 'app-profile-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class ProfileHomeComponent implements OnInit {
  pageTitle="Profile";
  //data for profile card component   
  formField:any=[];
  formData:any;  
  showLoader:boolean=true;
  constructor(
    private proSvc: ProfileSvc,
    private snack: MatSnackBar
  ){}

  ngOnInit() {
    //pass form fields 
    this.formField = mapProfile;
    //get profile data 
    this.proSvc.getCurrentProfile()
    .then((p)=>{      
      //debugger      
      this.setFormData(p);      
      this.showLoader = false;
    })
    .catch((e)=>{
      console.error(e);
      this.showLoader = false;
    });
  }
  /**
   * Set data   
   * data from profile data   
   * @param formData 
   */  
  setFormData(formData){    
    /*console.group("ProfileHomeComponent.prepFormData")
    console.log("formField", this.formField);
    console.log("formData", formData);
    console.groupEnd();*/
    this.formData = formData;
  }

  saveProfile(data){
    //debugger 
    /*console.group("ProfileHomeComponent.saveProfile")
    console.log("save profile", data);
    console.groupEnd();*/
    this.showLoader = true;
    //save it 
    this.proSvc.saveProfile(data)
    .then(()=>{
      this.showLoader = false;
      this.showMessage ("Profile saved!","success-msg-snack");
    })
    .catch((e)=>{
      this.showMessage("Failed to save!!!","error-msg-snack");
      this.showLoader = false;
    });
  }
  showMessage(msg:string,extraClass){
    this.snack.open(msg,null,{
      duration:3000,
      extraClasses:[extraClass]
    });
  }
}
