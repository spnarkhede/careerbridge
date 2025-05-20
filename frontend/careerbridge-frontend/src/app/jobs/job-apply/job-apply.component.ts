import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})
export class JobApplyComponent implements OnInit {
  job: Job | null = null;
  isLoading = true;
  isSubmitting = false;
  error: string | null = null;
  jobId: number = 0;
  applicationForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private snackBar: MatSnackBar
  ) {
    this.applicationForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      coverLetter: ['', [Validators.required, Validators.minLength(100)]],
      resumeUrl: ['', [Validators.required]],
      linkedInProfile: [''],
      portfolioUrl: [''],
      referral: ['']
    });
  }

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

  onSubmit(): void {
    if (this.applicationForm.valid) {
      this.isSubmitting = true;
      
      this.jobService.applyForJob(this.jobId, this.applicationForm.value).subscribe({
        next: (success) => {
          this.isSubmitting = false;
          this.snackBar.open('Application submitted successfully!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/jobs']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open('Failed to submit application. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          console.error('Application submission error:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.applicationForm);
    }
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/jobs', this.jobId]);
  }
}
