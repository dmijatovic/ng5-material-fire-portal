/**
 * System configuration file
 * 
 */

export const sysCfg = {
   redirect: {
      login: 'signin'
   },
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