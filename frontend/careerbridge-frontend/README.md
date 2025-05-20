# CareerbridgeFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


### 3. 🚀 Initialize Frontend 

#### 🔧 Frontend (Angular)
```bash
NAS1UL@FE-C-015HW MINGW64 ~/Desktop/spnarkhede/careerbridge1 (main) 
mkdir frontend
node --version && npm --version
    v21.6.1
    10.9.2
npm install -g @angular/cli
cd frontend 
ng new careerbridge-frontend --routing --style=scss --skip-git --skip-tests
cd careerbridge-frontend
npm install @angular/material @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/entity @apollo/client graphql --legacy-peer-deps
ng add @angular/material --skip-confirmation
mkdir -p src/app/{core,shared,auth,jobs,profile,dashboard}

ng generate module core && ng generate module shared && ng generate module auth --routing && ng generate module jobs --routing && ng generate module profile --routing && ng generate module dashboard --routing
ng generate component shared/components/header && ng generate component shared/components/footer && ng generate component shared/components/sidebar
ng generate component auth/login && ng generate component auth/register && ng generate component auth/forgot-password
ng generate component jobs/job-list && ng generate component jobs/job-detail && ng generate component jobs/job-apply
ng generate component profile/profile-view && ng generate component profile/profile-edit && ng generate component dashboard/dashboard-home
```

Choose routing and styling options during the prompt.