# ng4-material-fire

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2. This is starter project for ng4 with material (custom theme) and firebase.

## Project folder structure (modules)

This project is ment to be template for new portals. Therefore I decided to split number of 'standard' components from the 'client specific' components. The client specific components are placed in app while various system components are placed outside app folder. The complete structure is as follows:

- `app`: here we store customer specific pages
- `assets`: portal assets, like images etc.
- `environments`: environment definitions file(s)
- `firebase`: firebase definitions incl. private key(s). See readme.txt for more info
- `login`: login and authentication modules
- `material`: material design styles, custom fixes and material.module that holds material components used in the app
- `public`: this module keeps public avaliable pages. Public pages are completely separated from app and have their own page layout and routing
- `system`: system module that holds system pages like 401, 404, loaders etc.

## Branches

- `ng4mat`: starter branch ng4 with custom material theme. use this as stater. note that material is still in beta (beta 12 in this case). There was a bug in beta 11 version of angular/material, so I extracted scss file and changed few lines of theming code. The adapted material theming version is in material folder.
- `ng4portal`: basic dashboard portal demo and project starter for dashboards hosted with firebase. It has login and user modules for authentication. In addition it uses lazy loading of site modules (sections)
- `ng4firedemo`: firebase demo portal. It has public, user and app sections. It uses lazy loading of modules. firebase project is dv4fire.
- `dev`: branch used for developing new features testing new ideas. It has 3 sections: public, user and private. It uses dv4fire project on firebase.
- `master`: demo portal verson live on dv4all website
- `others`: this project might hold other branches in the future

## Development

- Run `npm run dev` for a dev server and sourcemaps. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- To add new material component, you need to 'inject' references in two places
    - add material component reference in your angualr component
    - add meterial module reference into material module (material/material.module.ts)

## Deployment ng4portal branch

To deploy starter portal (branch ng4portal), which uses firebase as backend and firehosting platform. Firebase hosting has its own cli. Definitions are stored in firebase.json. To deploy:

- build production version `npm run build-prod`
- publish content of dist folder `npm run deploy-fire`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Note, no automatic test deployed at this point in time

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

For help on angular, consult angular online documentation or github. For assistance on this portal contact Dusan Mijatovic (d.mijatovic@dv4all.nl)

## Lazy loading and routing

In this project we test lazy loading of the modules. Lazy loading and routing modules influence each other. For example when loading module that also has routes defined, each time the module is imported it will add menu items at specific routing level (the level where module is added). My first idea was to have routing within specific module, but this might not be propper approach in some ocassions. It depends if routing is needed/desired. I can think of two sort of modules: 

- component only module: it has no routing, it just shares the components accross the application
- component module with routing: it has components and the routing. Note than when importing this module within other modules the routing will be also added every time. This will create multiple routes to same components. This might be desired or NOT. So, think about this!
- routing only module: it has only routing. This routing module can be than included at the specific location/module in order to achieve desired routing functionality.

In this project we have 2 major sections that are lazy loaded

- public: main public module, access to public part of the app. This part uses different header/footer layout
- private: access to private section of the app

Lazy loading also INFLUENCE module imports/refrences in the app. Specific modules cannot be imported twice, this will cause an error. Specific modules should be imported at exact  section where are used because lazy loaded modules are not aware of the module loaded in another lazy loaded module. This might impact sharing data/info between lazy loaded modules. At this moment I am not sure about possibilities in this area. We will test this furher of course.

## Firebase hosting

This webapp is setup for firebase hosting. For deployment firebase cli is required. It can be installed through npm, see: https://firebase.google.com/docs/hosting/quickstart?authuser=0

To deploy project to firebase hosting site (firebase.json) use command `npm run deploy`. This will call firebase cli to deploy app from dist folder to firebase host. Prior to deplyment run `npm run build-prod` to create production build of angular app. Account used is dv4all with spark plan. Within spark plan following traffic is included in service

- Relatime database (firebase):
  - 100 simultanious connections
  - 1 GB storage
  - 10 GB/month traffic

- Hosting webapp files
  - 1 GB storage
  - 10 GB/month traffic

For more info about firebase hosting costs, see: https://firebase.google.com/pricing/?authuser=0

## Domains
Firebase hosting offers possibility to connect custom domain and get ssl for it. Note that dv4all domains (dv4all.com and dv4all.nl) are at Hostign2Go. During the precess of adding subdomain to firebase project, firebase will require you to add two A records at your provider. At Hosting2Go this is not possible, only one A record per subdomain is supported. So you should use CNAME records and provide firebase domainname as forward. This is the only way with hostings that do not allow multiple A records for same domain values.