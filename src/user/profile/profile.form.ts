//angular
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile.form.html',
  styleUrls: ['./profile.form.scss'],
  //providers: [ FormBuilder ]
})
export class ProfileForm implements OnInit, OnDestroy {  
  displayTitle:string="Title";
  displaySubtitle:string="subtitle";
  profileForm:FormGroup;
  profileFields:any=[];
  hiddenFields:any=[];
  fn:any=[];
  constructor(
    private fb: FormBuilder,
  ){
    //console.log("ProfileForm.constructor...started");
  }    
  @Output() onSaveForm = new EventEmitter();  
  @Input()
  set profileField(data:any){
    //debugger
    //console.log("ProfileForm.profileField", data);    
    if (data){
      let fbgr = this.createInputs(data);    
      if (fbgr) {
        this.createForm(fbgr)
      }
    }      
  }  
  @Input()
  set profileData(data:any){
    //debugger
    //console.log("ProfileForm.profileData", data);    
    if (data){
      this.updateForm(data);
    }    
  }  
  ngOnInit(){
    //check if we have funcs 
    if (this.fn.length > 0){
      this.profileForm.valueChanges
      .delay(400)
      .subscribe(()=>{
        this.execFn();
      });
    }
  }
  createInputs(formField){
    let fbGroup={};    
    this.profileFields=[];
    this.hiddenFields=[];
    this.fn=[];
    //debugger 
    //we create form based on field map
    formField.map((f)=>{      
      //create field defs
      if (f.type=="function"){
        //add functions
        this.fn.push(f);
      }else{
        //add input fields
        if (f.required){
          fbGroup[f.key] = new FormControl(null, Validators.required);
        }else{
          fbGroup[f.key] = new FormControl(null);
        }
        //add this field to fields collection      
        if (f.type=="hidden"){
          this.hiddenFields.push(f);            
        }else{
          this.profileFields.push(f);      
        }      
      }      
    });  
    return fbGroup;
  }
  createForm( fbGroup ){    
    //debugger 
    //create form controls
    this.profileForm = this.fb.group(fbGroup);
  }
  updateForm(data){    
    //console.log("ProfileForm.updateForm", data);
    //debugger
    if (this.profileForm && data){      
      //debugger
      //this.profileForm.setValue(data);
      this.profileForm.patchValue(data);
      //call functions?!?
      this.execFn();
    }
  }
  execFn(){
    //debugger 
    this.fn.map((f)=>{      
      //call function?!?
      f.fn(this);
    });
  }
  saveForm(){
    //debugger 
    this.onSaveForm.emit(this.profileForm.value)
  }

  ngOnDestroy(){}
}