import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: Job | null = null;
  isLoading = true;
  error: string | null = null;
  jobId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.jobId = +idParam;
        this.loadJobDetails(this.jobId);
      } else {
        this.error = 'Job ID not found';
        this.isLoading = false;
      }
    });
  }

  loadJobDetails(id: number): void {
    this.isLoading = true;
    this.jobService.getJobById(id).subscribe({
      next: (job) => {
        this.job = job;
        this.isLoading = false;
        if (!job) {
          this.error = 'Job not found';
        }
      },
      error: (error) => {
        this.error = 'Failed to load job details. Please try again later.';
        this.isLoading = false;
        console.error('Error loading job details:', error);
      }
    });
  }

  applyForJob(): void {
    this.router.navigate(['/jobs', this.jobId, 'apply']);
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }
}
