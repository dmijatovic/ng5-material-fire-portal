import { Component, OnInit, OnDestroy, 
  Input, Output, EventEmitter 
} from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile.card.html',
  styleUrls: ['./profile.card.scss']
})
export class ProfileCard implements OnInit, OnDestroy {
  //email is used as uniqueid
  //email:string;
  avatar:string;    
  profileField:any=[];
  profileData:any;
  constructor(
    //private profile: ProfileSvc
  ){
    //console.log("ProfileCard.constructor...started");
  }
  /**
   * pass save request up to parent
   */
  @Output() onSaveProfile = new EventEmitter();
  /**
   * receive profile data from parent
   */
  @Input()
  set formField(data){
    //debugger 
    //console.log("ProfileCard.formField", data);
    this.profileField = data;    
  }
  @Input()
  set formData(data){
    //debugger 
    //console.log("ProfileCard.formData", data);
    this.profileData = data;
    //set prop for profile form
    if (data && data.avatar){      
      //set property for avatar card 
      this.avatar = data['avatar'];
    }    
  }
  ngOnInit(){
    //get profile?
  }
  updateAvatar(data:string){
    //pass image
    //debugger
    this.avatar = data;     
  }
  saveProfileForm(data){
    //debugger 
    //console.log("save profile...", data);
    //update avatar?!?
    if (this.avatar){
      //debugger
      data['avatar'] = this.avatar;
    }    
    //add changeDate
    //debugger
    data['changeDate'] = new Date().toISOString();
    //pass data to parent
    this.onSaveProfile.emit(data);
  }
  ngOnDestroy(){}
}