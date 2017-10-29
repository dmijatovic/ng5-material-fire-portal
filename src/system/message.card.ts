import { Component, OnInit, Input } from '@angular/core';
//import { RouterLink } from '@angular/router';

interface linkBtn {
  label: string;
  link: string;
  color?: string;
}

interface formCfg {
  panelTitle: string;
  matIcon: string;  
  logo:string;    
  //the buttons
  button:Array<linkBtn>[];
}

@Component({
  selector: 'app-message-card',
  templateUrl: './message.card.html',
  styleUrls: ['./message.card.scss'],
  //providers:[ RouterLink ]
})
export class MessageCard implements OnInit {
  //form config
  cfg:formCfg
  panelStatus: string = null;
  panelMsg: string = null;  
  error: boolean = false;    
  showLoader:boolean = false;

  @Input()
  set formDef(cfg:formCfg){
    //debugger    
    this.cfg = cfg;
  }
  //create class  
  constructor(){}
  
  ngOnInit(){}

  setMsg({status="", msg="", error=false}){
    //
    this.panelStatus = status;  
    this.panelMsg = msg;  
    this.error = error;
  }  
  toggleLoader(){
    this.showLoader = !this.showLoader;
  }
}