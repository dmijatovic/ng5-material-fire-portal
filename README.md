# ng5-material-fire-portals

NOTE! This project is generated with [Angular CLI](https://github.com/angular/angular-cli) 1.4.2 as Angular 4 and later upgraded to Angular 5 and CLI version 1.5.0. 

The goal of the project is to test new features of Angular or to be a testbed for upgrading. Simply it is a Angular playground where it might happen that some features do not work properly after upgrade to versio 5.

The project contains 3 templates having same name as git branches:

- **ng4mat**: Angular 4 material starter, based on adapted material theme and beta 12 version
- **ng4portal**: User portal template. Starter for user portal projects. It has only private sections where users need to login. Start page is login screen.
- **ng4firedemo**: Portal with public and private sections. Start page is public from where user can login to private section.

## Project folder structure (modules)

This project is ment to be template for new portals. I decided to split number of 'standard' components from the 'client specific' components. The client specific components are placed in app while various system components are placed outside app folder. The complete structure is as follows:

- **app**: here we store customer specific pages
- **assets**: portal assets, like images etc.
- **environments**: environment definitions file(s)
- **firebase**: firebase definitions incl. private key(s). See readme.txt for more info
- **material**: material design styles, custom fixes and material.module that holds material components used in the app
- **system**: system module that holds system pages like 401, 404, loaders etc.
- **user**: login and user authentication modules

## Branches
- **dev**: branch used for developing new features and testing new ideas. THIS BRANCH IS UPDATED TO ANGULAR 5. Other branches are not upgraded yet. 
- **ng4mat**: starter branch ng4 with custom material theme. use this as stater. note that material is still in beta (beta 12 in this case). There was a bug in beta 11 version of angular/material, so I extracted scss file and changed few lines of theming code. The adapted material theming version is in material folder.
- **ng4portal**: basic dashboard portal demo and project starter for dashboards hosted with firebase. It has login and user modules for authentication. In addition it uses lazy loading of site modules (sections)
- **master**: demo portal verson live on dv4all website
- **others**: this project might hold other branches in the future

## Development
- Select branch you want to test/develop
- Run `npm run dev` for a dev server and sourcemaps. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- To add new material component, you need to 'inject' references in two places
  - add material component reference in your angular component
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

Lazy loading also INFLUENCE module imports/refrences in the app. Specific modules cannot be imported twice, this causes an error. Specific modules should be imported at exact section where are used because **lazy loaded module is not aware of the modules loaded in another lazy loaded module**. This might impact sharing the data between lazy loaded modules. At this moment, I am not sure about how services behave between lazy loaded modules. We will test this furher of course.

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

## **Angular 5 upgrade**

Upgrade is performed on 5 november 2017, manually. First ng cli is removed and new version (v1.5) installed. Then I created ng5 test project (another folder) and updated package.json to propper versions for used libraries (based on ng5 test project). Beside angular, RxJs and Typescript version are important. At this point I disabled npm-shrinkwrap (renamed to *.old), removed node_modules folder and runnen npm install to install all libs again. After installation message about version dependence (to ng v4) from angular material appeared, but I was able to proceed. Running in development mode worked succefully.

- HttpClient: in v5 http is part of common module. The HttpClientModule also needs to be imported in app module

```js
  import { HttpClient } from '@angular/common/http'
```

- SourceMaps: there is problem with scss sourcemaps and Angular cli v1.5.0
  - SCSS sourcemaps not working on new version of cli. Styles are extracted but there is no reference to original scss files. Instead is shows styles.bundle.scss file as source. For some components proper scss file is shown. These seem to be directly refered in the component, not via main.scss file.
  - TypeScript / JavaScript: sourcemaps seem to work.

- Size: file size v4 vs. v5
  - vendor bundle file size seems lot larger in dev mode that with previous version.
  - aot does reduces file sizes, still my impression is that vendor bundle is lot larger than with v4
