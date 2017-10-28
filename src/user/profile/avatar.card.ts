import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';

import { environment as env } from '../../environments/environment';
import { sysUtil as util } from '../../system/sys.cfg';

@Component({
  selector: 'app-avatar-card',
  templateUrl: './avatar.card.html',
  styleUrls: ['./avatar.card.scss']
})
export class AvatarCard implements OnInit {
  @Input() avatar:string = null;
  @Output() saveImage = new EventEmitter();
  @ViewChild('imgFileLoader') imgFileLoader;
  /*
  //saved:boolean=true;
  //set default image here   
  @Input()
  set image(img:string){
    if (img){
      debugger
      this.avatar = img;
    }    
  };*/  
  constructor(){
    //console.log("AvatarCard.constructor...started");
  }
  ngOnInit(){
    /*if (typeof(this.avatar)==='undefined'){      
      this.avatar=env.cfg.defaultAvatar;
    }*/
  }
  changeAvatar(){
    //console.log("change")
    //show load image window
    this.imgFileLoader.nativeElement.click();        
  }
  //convert file to b64
  imgFileToB64($event){            
    //convert to b64
    util.imgFileToB64($event)
    .then((d)=>{      
      //debugger 
      //pass image to parent 
      //note it comes back from parent too!
      this.saveImage.emit(d);    
    },(e)=>{
      if (e.cancel){
        console.log("No file selected");
      }else{
        let msg="Failed to upload image. ";
        console.error(msg);
      }
    });    
  }
}