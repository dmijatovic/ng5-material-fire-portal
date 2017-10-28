
export const mapProfile=[ 
  {"pos": 1, "key":"firstName","title":"First name",type:"text",required:true},
  {"pos": 2, "key":"lastName","title":"Last name",type:"text",required:true},
  {"pos": 3, "key":"jobTitle","title":"Job title",type:"text",required:false},
  {"pos": 4, "key":"companyName","title":"Company",type:"text",required:false},  
  {"pos": 5, "key":"birthDate","title":"Date of birth",type:"date",required:false},
  {"pos": 6, "key":"birthCity","title":"City of birth",type:"text",required:false},
  {"pos": 7, "key":"startpage","title":"Startpage",type:"hidden",required:true},
  //hidden fields in the form
  {"pos": 0, "key":"avatar","title":null,type:"hidden",required:true},
  {"pos": 0, "key":"email","title":null,type:"hidden",required:true},
  {"pos": 0, "key":"createDate","title":null,type:"hidden",required:true},   
  {"pos": 0, "key":"changeDate","title":null,type:"hidden"},   
  //functions?!?
  {"pos": 0, "key":"displayTitle","title":null,type:"function", fn:(me)=>{    
    if (me.profileForm.controls.firstName.value){
      me.displayTitle = me.profileForm.controls.firstName.value;      
    }
    if (me.profileForm.controls.lastName.value){
      if (me.displayTitle){
        me.displayTitle+=" " + me.profileForm.controls.lastName.value;
      }else{
        me.displayTitle = me.profileForm.controls.lastName.value;
      }       
    }
  }},
  {"pos": 0, "key":"displaySubtitle","title":null,type:"function", fn:(me)=>{    
    if (me.profileForm.controls.jobTitle.value){
      me.displaySubtitle = me.profileForm.controls.jobTitle.value;      
    }
    if (me.profileForm.controls.companyName.value){
      if (me.displaySubtitle){
        me.displaySubtitle+=" @ " + me.profileForm.controls.companyName.value;
      }else{
        me.displaySubtitle = me.profileForm.controls.companyName.value;
      }       
    }
  }},
]