import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent implements OnInit {
  
  matIcon:string;
  title:string;
  message:string;  
  loader:boolean=true;

  constructor(
    
  ){ }

  ngOnInit() {
      
  }

  showLoader(setting:any){
    debugger

    this.matIcon = setting.matIcon;
    this.title = setting.title;
    this.message = setting.msg;
    this.loader = setting.loader;

  }

  hideLoader(){
    this.loader=false;
  }

}
