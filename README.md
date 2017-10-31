# ng4-material-fire-portals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2 and uses Angular 4. It uses angular material, beta 12 (custom theme) and the firebase for the backend and hosting.

The project contains 3 templates having same name as git branches:

- **ng4mat**: Angular 4 material starter, based on adapted material theme and beta 12 version
- **ng4portal**: User portal template. Starter for user portal projects. It has only private sections where users need to login. Start page is login screen.
- **ng4firedemo**: Portal with public and private sections. Start page is public from where user can login to private section.

## Project folder structure (modules)

This project is ment to be template for new portals. Therefore I decided to split number of 'standard' components from the 'client specific' components. The client specific components are placed in app while various system components are placed outside app folder. The complete structure is as follows:

- **app**: here we store customer specific pages
- **assets**: portal assets, like images etc.
- **environments**: environment definitions file(s)
- **firebase**: firebase definitions incl. private key(s). See readme.txt for more info
- **material**: material design styles, custom fixes and material.module that holds material components used in the app
- **system**: system module that holds system pages like 401, 404, loaders etc.
- **user**: login and user authentication modules

## Branches

- **ng4mat**: starter branch ng4 with custom material theme. use this as stater. note that material is still in beta (beta 12 in this case). There was a bug in beta 11 version of angular/material, so I extracted scss file and changed few lines of theming code. The adapted material theming version is in material folder.
- **ng4portal**: basic dashboard portal demo and project starter for dashboards hosted with firebase. It has login and user modules for authentication. In addition it uses lazy loading of site modules (sections)
- **dev**: branch used for developing new features testing new ideas
- **master**: demo portal verson live on dv4all website
- **others**: this project might hold other branches in the future

## Development

- Run `npm run dev` for a dev server and sourcemaps. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- To add new material component, you need to 'inject' references in two places
  - add material component reference in your angualr component
  - add meterial module reference into material module (material/material.module.ts)

## Deployment ng4portal branch

To deploy starter portal (branch ng4portal), which uses firebase as backend and firehosting platform. Firebase hosting has its own cli. Definitions are stored in firebase.json. To deploy:

- build production version `npm run build-prod`
- publish content of dist folder `npm run deploy-fire`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Note, no automatic test deployed at this point in time

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

For help on angular, consult angular online documentation or github. For assistance on this portal contact Dusan Mijatovic (d.mijatovic@dv4all.nl)

## Lazy loading and routing

In this project we test lazy loading. Lazy loading and routing modules influence each other. For example when loading module that also has routes defined, each time the module is imported it will add menu items at specific routing level (the level where module is added). My first idea was to have routing within specific module, but this might not be propper approach in some situations. It depends if routing is needed/desired. I can think of two sort of modules:

- component only module: it has no routing, it just shares the components accross the application
- routing only module: it has only routing. This routing module can be than included at the specific location/module in order to achieve desired routing functionality.
- module with components and routing: it has components and the routing. Note that when importing this module within other modules the routing will also be added each time. This will create multiple routes to same components. This behaviour might be desired or NOT. **Think about this!**

In this project we have 3 major sections that are lazy loaded

- public: main public module, access to public part of the app. This part uses different header/footer layout
- private: access to private section of the app
- user: access to private section of the app

Lazy loading also INFLUENCE module imports/refrences in the app. Specific modules cannot be imported twice, this causes an error. Specific modules should be imported at exact  section where are used because **lazy loaded module is not aware of the modules loaded in another lazy loaded module**. This might impact sharing the data between lazy loaded modules. At this moment, I am not sure about how services behave between lazy loaded modules and can the info be shared. We will test this furher of course.

## Firebase hosting

This project is setup for firebase hosting. For deployment firebase cli is required. It can be installed through npm, see: https://firebase.google.com/docs/hosting/quickstart?authuser=0

To deploy project to firebase hosting site (firebase.json) use command `npm run deploy`. This will call firebase cli to deploy app from dist folder to firebase host. Prior to deplyment run `npm run build-prod` to create production build of angular app. The account used is dv4all with spark plan. Within spark plan following traffic is included in service

- Relatime database (firebase):
  - 100 simultanious connections
  - 1 GB storage
  - 10 GB/month traffic

- Hosting webapp files
  - 1 GB storage
  - 10 GB/month traffic

For more info about firebase hosting costs, see: https://firebase.google.com/pricing/?authuser=0

## Domains
Firebase hosting offers possibility to connect custom domain and get ssl certificate for it. Note that dv4all domains (dv4all.com and dv4all.nl) are at Hostign2Go. During the precess of adding subdomain to firebase project, firebase will require you to add two A records at your provider. At Hosting2Go this is not possible, only one A record per subdomain is supported. So you should use CNAME records and provide firebase domainname as forward. This is the only way with hostings that do not allow multiple A records for same domain values.