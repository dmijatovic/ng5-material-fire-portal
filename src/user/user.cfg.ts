/**
 * User module configurations
 * each page has their own config object
 * 
 * v.0.0.1 Oct 2017 
 */

/**
 * Register page config
 * input type page
 */
export const RegisterCfg={  
  panelTitle: "Register",
  matIcon:"pets",  
  logo:"assets/img/logo.jpg",  
  //where to go next
  nextNav:["user","verify"],
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
  msg:{default: 'Provide email and password to register.'},
  input:[
    {"key":"email","title":"Your email",type:"email",required:true},
    {"key":"password","title":"Your password",type:"password",required:true}
  ]
}

/**
 * Login page
 * input type page
 */
export const LoginCfg={
  panelTitle: "Login",
  matIcon:"lock_open",
  logo:"assets/img/logo.jpg",
  primBtn: {
    label: 'Login',
    link: 'login'
  },
  secoBtn: {
    label: 'Forgot password',
    link: '../password'
  },
  thrdBtn: {    
    label: 'Register',
    link: '../register'
  },
  msg:{default:'Provide your credentials and hit login button.'},
  input:[
    {"pos": 1, "key":"email","title":"Your email",type:"email",required:true},
    {"pos": 2, "key":"password","title":"Your password",type:"password",required:true}
  ]
}


/**
 * Create profile object 
 * buttons redefined in ngOnInit
 * input type page
 */
export const CreateProfileCfg={  
  panelTitle: "Your profile",
  matIcon:"perm_contact_calendar",  
  logo:"assets/img/logo.jpg",    
  primBtn: {
    label: 'Create profile',
    link: 'profile'
  },
  secoBtn: {
    label: null,
    link: null
  },
  thrdBtn: {
    label: null,
    link: null
  },  
  input:[
    //hidden fields to fill in programatically
    //{"key":"avatar","title":null,type:"hidden",required:false},
    //{"key":"email","title":null,type:"hidden",required:false},
    //{"key":"createDate","title":null,type:"hidden",required:false},
    {"key":"firstName","title":"First name *",type:"text",required:true},
    {"key":"lastName","title":"Last name *",type:"text",required:true},
    {"key":"jobTitle","title":"Job title",type:"text",required:false},
    {"key":"companyName","title":"Company name",type:"text",required:false}
    /*{"key":"startpage","title":"Starpage",type:"select",required:true,
      options:[
        {key:'Home', value:'/app/home'},
        {key:'Profile', value:'/app/profile'}
      ]
    },*/
  ],
  msg:{ 
    default:`
    <h4>Last but not least</h4>
    <p>Give us some basic information about you.
    This will help you test user profile features of the portal.  
    `,
    login:`
    <h4>User not logged in</h4>
    <p>Something went wrong during the registration process.
    After you verified your email you create your profile
    at this page after you login. Please login again. 
    </p>`
  }
}


/**
 * Password reset 
 * input type page
 */
export const ResetPasswordCfg={  
  panelTitle: "Reset",
  matIcon:"settings_backup_restore",  
  logo:"assets/img/logo.jpg",  
  //where to go next
  nextNav:["user","verify"],
  primBtn: {
    label: 'Reset password',
    link: 'password'
  },
  secoBtn: {
    label: null,
    link: null
  },
  thrdBtn: {
    label: 'Back to login',
    link: '../login'    
  },
  input:[
    {"key":"email","title":"Your email",type:"email",required:true}    
  ],
  msg:{
    default: `
    Provide the same email address you used to create your account and 
    we will send reset instructions to that email address.
    `,
    success:`
    We send you an e-mail with a link to use to 
    reset you current password. Please check your 
    mailbox and follow the instruction.
    <br><br>
    Thanks,
    dv4all team
    `
  }  
}

/**
 * Change email
 * input type page
 */
export const ChangeEmailCfg={  
  panelTitle: "Change",
  matIcon:"local_post_office",  
  logo:"assets/img/logo.jpg",  
  //where to go next
  nextNav:["user","verify"],
  primBtn: {
    label: 'Change email',
    link: 'email'
  },
  secoBtn: {
    label: null,
    link: null
  },
  thrdBtn: {
    label: 'Back to login',
    link: '../login'    
  },  
  input:[
    {"key":"oldemail","title":"Current email",type:"email",required:true},
    {"key":"newemail","title":"New email",type:"email",required:true}
    //function
  ],
  msg:{
    default:`
    Provide your current email used to login. You will need to verify 
    new email address in same way you did it with the current email.
    `,
    login:`
    <h4>Please login</h4>
    <p>We are unable to verify your current email.</p>
    `,
    invalid:`
    <h4>Invalid email provided</h4>
    <p>One of provided emails seem not to be valid.
    Please use valid new email and provide current email
    used to login to portal.</p>
    <p>BTW: validation is not case sensitive</p>
    `,
    success:`
    <h4>DONE!</h4>
    <p>
    Please login using your new credentials (email). 
    We will then send you e-mail to verify your credentials.    
    </p>
    <p>I know, ... this is not very user friendly but it 
    needs to be done at each change of email address.</p>
    Thanks,
    dv4all demo team
    `
  }
}


/**
 * Remove account
 * input type page
 */
export const RemoveAccountCfg={  
  panelTitle: "Remove",
  matIcon:"delete_forever",  
  logo:"assets/img/logo.jpg",  
  //where to go next
  //nextNav:["user","verify"],
  primBtn: {
    label: 'Remove account',
    link: 'remove'
  },
  secoBtn: {
    label: null,
    link: null
  },
  thrdBtn: {
    label: 'Register',
    link: '../register'    
  },
  msg:{
    default:`
    <strong>Note that this action will permanently delete your account.</strong>
    `,
    login:`
    <h4>Please login</h4>
    <p>We are unable to verify your account.</p>
    `,
    success:`
    <h4>DONE!</h4>
    <p>
    We deleted your account. Sorry to see you leaving.
    </p>
    Till next time!<br/>
    dv4all team
    `
  }, 
  input:[
    {"key":"email","title":"Your email",type:"email",required:true},
    {"key":"password","title":"Your password",type:"password",required:true}    
  ]
}


/**
 * Verify email card/page
 * message type page
 */
export const VerifyEmailCfg={
  panelTitle: "Almost there",
  matIcon:"verified_user",  
  logo:"assets/img/logo.jpg",  
  email: "no e-mail provided",
  signature:'dv4all, firebase demo team',
  button:[
    {label:'Sign in', link:'/user/login', color:'primary'},
    {label:'Email', link:'/user/email', color:'secondary'},
    {label:'Delete', link:'/user/remove', color:'warn'},
  ],
  msg:{
    login:`
    <h4>User not logged in</h4>
    <p>Something went wrong during registration process.
    After registering you should receive e-mail 
    to verify your user account. Unfortunatelly 
    the verification email cannot be sent.
    </p>
    `,
    success:`
    <p>
      We send an email to:
      <strong>{{email}}</strong>
    </p>
    <p>
      Please check you mailbox, find the email and click on the link. This will verify that your email address is valid.
    </p>
    <p>
      After receiving confirmation, please sign in to your account.
    </p>
    <p>
      <strong>Oooh no! That e-mail is not correct?</strong>
      <br/>
      <br>You have two options in case you provided incorrect e-mail: update the email or delete your account.
    </p>
    <p>
      Thanks,
      <br/>
      dv4all firebase demo team
    </p>
    `,
  }
}


/**
 * Logout
 * message type page
 */
export const LogoutCfg={
  panelTitle: "Sign out",
  matIcon:"directions_run",  
  logo:"assets/img/logo.jpg",    
  button:[
    {label:'Sign in', link:'/user/login', color:'primary'}    
  ],
  msg:{
    default:`
    <h4>Sign out</h4>
    <p>Leaving portal soon...</p>
    `,
    login:`
    <h4>Please login</h4>
    <p>We are unable to verify your account.</p>
    `,
    success:`    
    <p>Signed out! Till next time</p>            
    `
  }
}
