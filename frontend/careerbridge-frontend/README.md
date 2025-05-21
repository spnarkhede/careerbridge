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

# CareerBridge Frontend Implementation Guide

## Overview
This document provides instructions for running and further developing the CareerBridge platform frontend. The implementation follows the requirements specified in the project documentation, using Angular with TypeScript, Angular Material, and NgRx for state management.

## Project Structure
The CareerBridge frontend is organized into the following modules:

- **Core Module**: Contains essential services, models, and utilities used throughout the application
- **Shared Module**: Contains reusable components, directives, and pipes
- **Auth Module**: Handles user authentication, registration, and password recovery
- **Jobs Module**: Manages job listings, job details, and application processes
- **Profile Module**: Handles user profile management
- **Dashboard Module**: Provides dashboard views for different user roles

## Technology Stack
- Angular 17/18
- TypeScript
- Angular Material
- NgRx for state management
- RxJS for reactive programming

## Getting Started

### Prerequisites
- Node.js (v16.x or later)
- npm (v8.x or later)
- Angular CLI (latest version)

### Installation
1. Unzip the provided `careerbridge-frontend.zip` file
2. Navigate to the project directory:
   ```
   cd careerbridge-frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server:
```
ng serve
```

The application will be available at `http://localhost:4200/`.

## Features Implemented

### Authentication
- Login with email and password
- User registration with role selection
- Password recovery flow
- JWT-based authentication (simulated with dummy data)

### Job Management
- Job listing with search and filtering
- Detailed job view
- Job application form
- Application tracking

### User Profiles
- Profile viewing and editing
- Resume/CV management
- Skills and experience tracking

### Dashboard
- Role-specific dashboards
- Application status tracking
- Job posting management (for employer role)

## Dummy Data
The current implementation uses dummy data services that simulate backend API calls. These services are located in the `core/services` directory and can be replaced with actual API calls when the backend is available.

## Next Steps for Development

### Backend Integration
1. Replace dummy data services with actual API calls
2. Implement proper error handling for API responses
3. Set up environment configurations for different deployment targets

### State Management Enhancement
1. Expand NgRx store to cover all application state
2. Implement proper loading and error states
3. Add more sophisticated selectors for complex data queries

### UI/UX Improvements
1. Enhance responsive design for mobile devices
2. Implement more advanced filtering and search capabilities
3. Add animations and transitions for better user experience

### Testing
1. Add unit tests for components and services
2. Implement end-to-end tests for critical user flows
3. Set up continuous integration for automated testing

## Deployment
To build the application for production:
```
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory and can be deployed to any static hosting service.

## Additional Resources
- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
- [NgRx Documentation](https://ngrx.io/docs)
