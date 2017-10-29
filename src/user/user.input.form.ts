//angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { Router, ActivatedRoute } from '@angular/router';

interface formBtn {
  label: string;
  link: string;
}

interface formCfg {
  panelTitle: string;
  matIcon: string;  
  logo:string;    
  //the button labels    
  //used when switching
  primBtn: formBtn;
  secoBtn: formBtn;
  thrdBtn: formBtn; 
  input:[{}]; 
}

@Component({
  selector: 'user-input-form',
  templateUrl: './user.input.form.html',
  styleUrls: ['./user.input.form.scss']
})
export class UserInputForm implements OnInit {
  //form config
  cfg:formCfg
  //internal 
  inputForm: FormGroup;
  inputField: any = [];
  panelStatus: string = null;
  panelMsg: string = null;
  //do we have error (msg)
  error: boolean = false;    
  //loader flag
  showLoader: boolean = false;
  //hide form - needed in some cases
  hideForm: boolean = false;
  //create class
  constructor(
    private formBuilder: FormBuilder,    
    //private router: Router,
    //private routeData: ActivatedRoute
  ) {
    //debugger
    //console.log("UserInputForm...constructor");
  }
  @Input()
  set formDef(cfg:formCfg){
    this.cfg = cfg;
  }  
  @Output() onSubmit = new EventEmitter();
  ngOnInit() {
    //debugger 
    if (this.cfg){
      this.createInput();
      this.createForm();
    }else{
      console.error("No formDef provided (or empty)...UserInputForm.ngOnInit");
    }    
  }
  createInput(){
    this.inputField = this.cfg.input;
  }
  createForm(){
    let fgr={};
    //map defined input fields 
    this.inputField.map((f)=>{
      if (f.required){
        fgr[f.key] = new FormControl(
          null, Validators.required
        )      
      }else{
        fgr[f.key] = new FormControl()      
      }      
    });
    //create form group
    this.inputForm = this.formBuilder.group(fgr);
  }
  setMsg({status="", msg="", error=false}){
    //
    this.panelStatus = status;  
    this.panelMsg = msg;  
    this.error = error;
  }  
  toggleLoader(){
    this.showLoader = ! this.showLoader;
  }
  /**
   * SUBMIT to parent
   */
  Submit() {
    //console.log("pass submit to parent");
    //send values to parent
    this.onSubmit.emit(this.inputForm.value);    
  }
}
