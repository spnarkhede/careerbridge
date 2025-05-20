import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Job, JobStatus, EmploymentType, ExperienceLevel } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Get all jobs with optional filtering
  getJobs(filters?: any): Observable<Job[]> {
    return this.http.post<any>(`${this.apiUrl}/graphql`, {
      query: `
        query GetJobs {
          jobs {
            id
            title
            description
            type
            location
            visibility
            salary
            applicationDeadline
            isActive
            createdAt
            updatedAt
            organization {
              id
              name
              logo
              industry
            }
          }
        }
      `
    }).pipe(
      map(response => {
        const jobs = response.data?.jobs;
        if (!jobs) {
          return [];
        }
        
        // Transform backend job format to frontend job model
        return jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.organization?.name || 'Unknown Company',
          location: job.location,
          description: job.description,
          requirements: [], // These would need to be added to the backend model
          responsibilities: [], // These would need to be added to the backend model
          salary: job.salary,
          employmentType: this.mapJobType(job.type),
          experienceLevel: ExperienceLevel.MID, // Default as this isn't in backend model yet
          postedDate: new Date(job.createdAt),
          deadline: new Date(job.applicationDeadline),
          status: job.isActive ? JobStatus.ACTIVE : JobStatus.CLOSED,
          companyLogo: job.organization?.logo || 'assets/images/companies/default.png',
          tags: [] // These would need to be added to the backend model
        }));
      }),
      catchError(error => {
        console.error('Error fetching jobs', error);
        return throwError(() => new Error(error.message || 'Failed to fetch jobs'));
      })
    );
  }

  // Get job by ID
  getJobById(id: number): Observable<Job | null> {
    return this.http.post<any>(`${this.apiUrl}/graphql`, {
      query: `
        query GetJob($id: ID!) {
          job(id: $id) {
            id
            title
            description
            type
            location
            visibility
            salary
            applicationDeadline
            isActive
            createdAt
            updatedAt
            organization {
              id
              name
              logo
              industry
            }
          }
        }
      `,
      variables: { id: id.toString() }
    }).pipe(
      map(response => {
        const job = response.data?.job;
        if (!job) {
          return null;
        }
        
        // Transform backend job to frontend job model
        return {
          id: job.id,
          title: job.title,
          company: job.organization?.name || 'Unknown Company',
          location: job.location,
          description: job.description,
          requirements: [], // These would need to be added to the backend model
          responsibilities: [], // These would need to be added to the backend model
          salary: job.salary,
          employmentType: this.mapJobType(job.type),
          experienceLevel: ExperienceLevel.MID, // Default as this isn't in backend model yet
          postedDate: new Date(job.createdAt),
          deadline: new Date(job.applicationDeadline),
          status: job.isActive ? JobStatus.ACTIVE : JobStatus.CLOSED,
          companyLogo: job.organization?.logo || 'assets/images/companies/default.png',
          tags: [] // These would need to be added to the backend model
        };
      }),
      catchError(error => {
        console.error(`Error fetching job with ID ${id}`, error);
        return throwError(() => new Error(error.message || 'Failed to fetch job details'));
      })
    );
  }

  // Apply for a job
  applyForJob(jobId: number, application: any): Observable<boolean> {
    // This would need a mutation in the backend for job applications
    // For now, we'll return a mock success
    console.log(`Applying for job ${jobId}`, application);
    return of(true);
  }

  // Post a new job (for employers)
  postJob(job: Partial<Job>): Observable<Job> {
    return this.http.post<any>(`${this.apiUrl}/graphql`, {
      query: `
        mutation CreateJob($createJobInput: CreateJobDto!) {
          createJob(createJobInput: $createJobInput) {
            id
            title
            description
            type
            location
            visibility
            salary
            applicationDeadline
            isActive
            organizationId
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        createJobInput: {
          title: job.title,
          description: job.description,
          type: this.mapEmploymentType(job.employmentType),
          location: job.location,
          visibility: 'PUBLIC', // Default to public
          salary: job.salary,
          applicationDeadline: job.deadline,
          organizationId: '1' // This would need to be the actual org ID of the employer
        }
      }
    }).pipe(
      map(response => {
        const newJob = response.data?.createJob;
        if (!newJob) {
          throw new Error('Failed to create job');
        }
        
        // Transform backend job to frontend job model
        return {
          id: newJob.id,
          title: newJob.title,
          company: job.company || 'Your Company',
          location: newJob.location,
          description: newJob.description,
          requirements: job.requirements || [],
          responsibilities: job.responsibilities || [],
          salary: newJob.salary,
          employmentType: this.mapJobType(newJob.type),
          experienceLevel: job.experienceLevel || ExperienceLevel.MID,
          postedDate: new Date(newJob.createdAt),
          deadline: new Date(newJob.applicationDeadline),
          status: newJob.isActive ? JobStatus.ACTIVE : JobStatus.CLOSED,
          companyLogo: job.companyLogo || 'assets/images/companies/default.png',
          tags: job.tags || []
        };
      }),
      catchError(error => {
        console.error('Error creating job', error);
        return throwError(() => new Error(error.message || 'Failed to create job'));
      })
    );
  }

  // Helper method to map backend job type to frontend employment type
  private mapJobType(type: string): EmploymentType {
    switch (type) {
      case 'full_time':
        return EmploymentType.FULL_TIME;
      case 'part_time':
        return EmploymentType.PART_TIME;
      case 'contract':
        return EmploymentType.CONTRACT;
      case 'internship':
        return EmploymentType.INTERNSHIP;
      case 'temporary':
        return EmploymentType.TEMPORARY;
      default:
        return EmploymentType.FULL_TIME;
    }
  }

  // Helper method to map frontend employment type to backend job type
  private mapEmploymentType(type?: EmploymentType): string {
    switch (type) {
      case EmploymentType.FULL_TIME:
        return 'full_time';
      case EmploymentType.PART_TIME:
        return 'part_time';
      case EmploymentType.CONTRACT:
        return 'contract';
      case EmploymentType.INTERNSHIP:
        return 'internship';
      case EmploymentType.TEMPORARY:
        return 'temporary';
      default:
        return 'full_time';
    }
  }
}
