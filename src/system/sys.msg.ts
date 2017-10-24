
import { sysCfg as sys } from './sys.cfg';


export const sysMsg={
    "401":{
        id:'401',        
        matIcon:"lock",
        title:"Access denied",
        btn:{
            label:"Sign in",
            path: sys.loginPage
        },
        msg:`
            <p>Sorry, it seems you don't have access rights for this page</p>                        
        `        
    },
    "404":{
        id:'404',
        matIcon:"warning",
        title:"Page missing",
        btn:{
            label:"Start page",
            path: sys.startPage
        },
        msg:`
        <p>Sorry, it seems that page does not exist</p>            
        `
    },
    "500":{
        id:'500',
        matIcon:"error",
        title:"System error",
        btn:{
            label:"Start page",
            path: sys.startPage
        },
        msg:`
        <p>Sorry, something went terribly wrong</p>            
        `
    },
    "default":{
        id:'999',
        matIcon:"error",
        title:"System error",
        btn:{
            label:"Start page",
            path: sys.startPage
        },
        msg:`
        <p>Sorry, something went terribly wrong</p>            
        `
    }
}