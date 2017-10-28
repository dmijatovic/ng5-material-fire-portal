/**
 * System configuration file
 * 
 */
export const sysCfg = {
  //app startpage
  startPage: '/app',
  loginPage: '/user/login',
  defaultAvatar: 'assets/img/avatar.png',
  //user login page 
  //button data 
  //passed via router
  user: {
    login: {
      panelTitle: "Login",
      login: true,
      primBtn: {
        label: 'Login',
        link: 'login'
      },
      secoBtn: {
        label: 'Forgot password',
        link: '../password'
      },
      thrdBtn: {
        //label:null,
        //link:null
        label: 'Register',
        link: '../register'
      },
      panelMsg: 'Provide credentials and press login button.'
    },
    register: {
      panelTitle: "Register",
      login: false,
      primBtn: {
        label: 'Register',
        link: 'register'
      },
      secoBtn: {
        label: 'Forgot password',
        link: '../password'
      },
      thrdBtn: {
        label: 'Login',
        link: '../login'
      },
      panelMsg: 'Provide email and password to register.'
    }
  },
  //firebase paths used by 
  //login.svc
  firebase: {
    mainMenuPath: '/menu/main',
    profileMenuPath: '/menu/profile',
    userPath: '/user'
  },
  //props used by admin section of portal 
  admin: {
    //tables
    items: ['menu', 'user', 'profile'],
    //menu table map
    menu: [
      { key: 'active', title: 'Active', type: 'boolean', required: true },
      { key: 'pos', title: 'Position', type: 'number', required: true },
      { key: 'title', title: 'Title', type: 'text', required: true },
      { key: 'matIcon', title: 'Material icon', type: 'text', required: true },
      { key: 'path', title: 'Local path', type: 'text', required: true }
    ]

  }
}


/**
 * Utility functions 
 */
export const sysUtil = {
  //convert file to b64
  imgFileToB64($event): Promise<any> {
    //take first file ONLY
    let file: File = $event.target.files[0];
    let reader = new FileReader();

    return new Promise((resolve, reject) => {
      //check file length 
      //event is triggered on chage 
      //in some case change from some file 
      //name to no filename also triggers 
      //the event 
      if ($event.target.files.length == 0) {
        //debugger 
        reject({
          err: 400,
          msg: "No file selected",
          cancel: true
        });
      } else {
        //define async action 
        //after file loaded                            
        reader.onloadend = (e) => {
          if ($event.target.error != null) {
            debugger
            //return "E"
            reject(e);
            //throw new Error($event.target.error);
            //return Promise.reject($event.target.error)                
          } else {
            resolve(reader.result);
          }
        }
        //issue read command            
        reader.readAsDataURL(file);
      }
    });
  }
}