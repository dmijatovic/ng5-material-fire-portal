/**
 * User module configurations
 * each page has their own config object
 * 
 * v.0.0.1 Oct 2017 
 */

/**
 * Login page
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
  panelMsg: 'Provide your credentials and hit login button.',
  input:[
    {"pos": 1, "key":"email","title":"Your email",type:"email",required:true},
    {"pos": 2, "key":"password","title":"Your password",type:"password",required:true}
  ]
}

/**
 * Register page config
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
  panelMsg: 'Provide email and password to register.',
  input:[
    {"key":"email","title":"Your email",type:"email",required:true},
    {"key":"password","title":"Your password",type:"password",required:true}
  ]
}

/**
 * Password reset 
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
  panelMsg: `
    Provide the same email address you used to create your account and 
    we will send reset instructions to that email address.
  `,
  input:[
    {"key":"email","title":"Your email",type:"email",required:true}    
  ]
}

/**
 * Change email
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
 * Verify email card/page
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