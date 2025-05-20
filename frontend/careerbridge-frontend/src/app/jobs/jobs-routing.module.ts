import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobApplyComponent } from './job-apply/job-apply.component';

const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: ':id', component: JobDetailComponent },
  { path: ':id/apply', component: JobApplyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
