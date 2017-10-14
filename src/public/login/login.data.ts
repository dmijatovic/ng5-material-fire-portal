/**
 * These data are passed using router module 
 */

export const loginFormData={
   panelTitle:"Login", 
   login: true,
   primBtn:{
      label:'Sign in',
      link:'signin'
   },
   secoBtn:{
      label:'Forgot password',
      link:'/password'
   },
   thrdBtn:{
      label:'Sign up',
      link:'../signup'
   },
   panelMsg:'Provide credentials and press login button.'
}

export const registerFormData={
   panelTitle:"Register",
   login: false,
   primBtn:{
      label:'Sign up',
      link:'signup'
   },
   secoBtn:{
      label:'Forgot password',
      link:'/password'
   },
   thrdBtn:{
      label:'Sign in',
      link:'../signin'
   },
   panelMsg:'Provide email and password to register.'
}