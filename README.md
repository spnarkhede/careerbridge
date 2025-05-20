# CareerBridge

A full-stack application for connecting job seekers with career opportunities. Built with Angular/Next.js on the frontend and Node.js/Express or NestJS on the backend.

## 📁 Project Structure

careerbridge/
├── frontend/ # Angular or Next.js client
└── backend/ # Node.js/NestJS/Express API


## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev  # for Next.js
# or
ng serve     # for Angular
```

### Backend

```bash
cd backend
npm install
npm run start
```


---

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