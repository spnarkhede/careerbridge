import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Pagination
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex = 0;
  totalJobs = 0;
  
  // Search and filters
  searchTerm = '';
  selectedFilters: any = {
    employmentType: [],
    experienceLevel: [],
    location: []
  };

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.filteredJobs = [...jobs];
        this.totalJobs = this.filteredJobs.length;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load jobs. Please try again later.';
        this.isLoading = false;
        console.error('Error loading jobs:', error);
      }
    });
  }

  applyFilters(): void {
    // This would be more sophisticated in a real app
    this.filteredJobs = this.jobs.filter(job => {
      // Simple search by title or company
      if (this.searchTerm && !job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
          !job.company.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by employment type if any selected
      if (this.selectedFilters.employmentType.length > 0 && 
          !this.selectedFilters.employmentType.includes(job.employmentType)) {
        return false;
      }
      
      // Filter by experience level if any selected
      if (this.selectedFilters.experienceLevel.length > 0 && 
          !this.selectedFilters.experienceLevel.includes(job.experienceLevel)) {
        return false;
      }
      
      // Filter by location if any selected
      if (this.selectedFilters.location.length > 0 && 
          !this.selectedFilters.location.includes(job.location)) {
        return false;
      }
      
      return true;
    });
    
    this.totalJobs = this.filteredJobs.length;
    this.pageIndex = 0; // Reset to first page when filtering
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  getCurrentPageJobs(): Job[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredJobs.slice(startIndex, startIndex + this.pageSize);
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  // Fix for the template binding error
  onSearchFromInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.onSearch(target.value);
    }
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedFilters = {
      employmentType: [],
      experienceLevel: [],
      location: []
    };
    this.filteredJobs = [...this.jobs];
    this.totalJobs = this.filteredJobs.length;
    this.pageIndex = 0;
  }
}
