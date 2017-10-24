/**
 * System configuration file
 * 
 */
export const sysCfg = {
  //app startpage
  startPage:'/app',
  loginPage:'/user/login',
  //user login page 
  //button data 
  //passed via router
  user:{
    login:{
      panelTitle:"Login", 
      login: true,
      primBtn:{
         label:'Login',
         link:'login'
      },
      secoBtn:{
         label:'Forgot password',
         link:'../password'
      },
      thrdBtn:{
         //label:null,
         //link:null
         label:'Register',
         link:'../register'
      },
      panelMsg:'Provide credentials and press login button.'
    },
    register:{
      panelTitle:"Register",
      login: false,
      primBtn:{
         label:'Register',
         link:'register'
      },
      secoBtn:{
         label:'Forgot password',
         link:'../password'
      },
      thrdBtn:{
         label:'Login',
         link:'../login'
      },
      panelMsg:'Provide email and password to register.'
    }  
  },
  //props used by admin section of portal 
  admin: {
     //tables
     items: ['menu', 'user', 'profile'],            
     //menu table map
     menu: [
        {key:'active', title: 'Active', type: 'boolean', required: true },
        {key:'pos',title:'Position',type:'number',required: true },
        {key:'title',title:'Title',type:'text',required: true },         
        {key:'matIcon', title: 'Material icon', type: 'text', required: true },
        {key:'path', title: 'Local path', type: 'text', required: true }
     ]
     
  }
}