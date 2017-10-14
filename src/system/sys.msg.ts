

export const sysMsg={
    "401":{
        id:'401',        
        matIcon:"lock",
        title:"Access denied",
        msg:`
            <p>Sorry, it seems you don't have access rights for this page</p>            
        `
    },
    "404":{
        id:'404',
        matIcon:"warning",
        title:"Page missing",
        msg:`
        <p>Sorry, it seems that page does not exist</p>            
        `
    },
    "500":{
        id:'500',
        matIcon:"error",
        title:"System error",
        msg:`
        <p>Sorry, something went terribly wrong</p>            
        `
    },
    "default":{
        id:'999',
        matIcon:"error",
        title:"System error",
        msg:`
        <p>Sorry, something went terribly wrong</p>            
        `
    }
}