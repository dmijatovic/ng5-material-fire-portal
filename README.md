# ng4-material-fire

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2. This is starter project for ng4 with material (custom theme) and firebase.

## Project folder structure (modules)
This project is ment to be template for new portals. Therefore I decided to split 
number of 'standard' components from the 'client specific' components. The client specific components are placed in app while various system components are placed outside app folder. The complete structure is as follows:

- `app`: here we store customer specific pages
- `assets`: portal assets, like images etc.
- `environments`: environment definitions file(s)
- `firebase`: firebase definitions incl. private key(s). See readme.txt for more info
- `login`: login and authentication modules
- `material`: material design styles, custom fixes and material.module that holds material components used in the app 
- `system`: system module that holds system pages used by app, like 401, 404, loaders etc.

## Branches

- `ng4mat`: starter branch ng4 with custom material theme. use this as stater. note that material is still in beta (beta 12 in this case). There was a bug in beta 11 version of angular/material, so I extracted scss file and changed few lines of theming code. The adapted material theming version is in material folder. 
- `dev`: branch used for developing new features testing new ideas
- `master`: demo portal verson live on dv4all website
- `others`: this project might hold other branches in the future 

## Development

- Run `npm run dev` for a dev server and sourcemaps. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- To add new material component, you need to 'inject' references in two places 
    - add material component reference in your angualr component
    - add meterial module reference into material module (material/material.module.ts)

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
