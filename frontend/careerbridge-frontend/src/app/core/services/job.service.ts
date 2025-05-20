import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Job, JobStatus, EmploymentType, ExperienceLevel } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }

  // Get all jobs with optional filtering
  getJobs(filters?: any): Observable<Job[]> {
    // Simulate API call with dummy data
    const dummyJobs: Job[] = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'New York, NY',
        description: 'We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences.',
        requirements: [
          'At least 5 years of experience with JavaScript/TypeScript',
          'Strong experience with Angular or React',
          'Experience with state management (NgRx, Redux)',
          'Understanding of responsive design and cross-browser compatibility'
        ],
        responsibilities: [
          'Develop new user-facing features',
          'Build reusable components and libraries for future use',
          'Optimize applications for maximum speed and scalability',
          'Collaborate with backend developers and designers'
        ],
        salary: '$120,000 - $150,000',
        employmentType: EmploymentType.FULL_TIME,
        experienceLevel: ExperienceLevel.SENIOR,
        postedDate: new Date(2025, 4, 15),
        deadline: new Date(2025, 5, 15),
        status: JobStatus.ACTIVE,
        companyLogo: 'assets/images/companies/techcorp.png',
        tags: ['Angular', 'TypeScript', 'Frontend', 'NgRx']
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'InnovateSoft',
        location: 'Remote',
        description: 'Join our dynamic team to build cutting-edge web applications using modern technologies.',
        requirements: [
          'Experience with JavaScript/TypeScript',
          'Knowledge of Angular, React, or Vue',
          'Experience with Node.js and Express',
          'Familiarity with databases (SQL, NoSQL)'
        ],
        responsibilities: [
          'Develop both frontend and backend components',
          'Implement responsive design and ensure cross-browser compatibility',
          'Optimize application for performance',
          'Participate in code reviews and team discussions'
        ],
        salary: '$90,000 - $120,000',
        employmentType: EmploymentType.FULL_TIME,
        experienceLevel: ExperienceLevel.MID,
        postedDate: new Date(2025, 4, 10),
        deadline: new Date(2025, 5, 10),
        status: JobStatus.ACTIVE,
        companyLogo: 'assets/images/companies/innovatesoft.png',
        tags: ['Full Stack', 'JavaScript', 'Node.js', 'Angular']
      },
      {
        id: 3,
        title: 'UX/UI Designer',
        company: 'DesignHub',
        location: 'San Francisco, CA',
        description: 'We are seeking a talented UX/UI Designer to create beautiful and functional interfaces for our clients.',
        requirements: [
          'Portfolio demonstrating UX/UI design skills',
          'Experience with design tools (Figma, Sketch, Adobe XD)',
          'Understanding of user-centered design principles',
          'Knowledge of HTML/CSS is a plus'
        ],
        responsibilities: [
          'Create wireframes, prototypes, and high-fidelity designs',
          'Conduct user research and usability testing',
          'Collaborate with developers to implement designs',
          'Maintain design system and component library'
        ],
        salary: '$100,000 - $130,000',
        employmentType: EmploymentType.FULL_TIME,
        experienceLevel: ExperienceLevel.MID,
        postedDate: new Date(2025, 4, 5),
        deadline: new Date(2025, 5, 5),
        status: JobStatus.ACTIVE,
        companyLogo: 'assets/images/companies/designhub.png',
        tags: ['UX', 'UI', 'Design', 'Figma']
      },
      {
        id: 4,
        title: 'DevOps Engineer Intern',
        company: 'CloudTech Solutions',
        location: 'Chicago, IL',
        description: 'Great opportunity for students to gain hands-on experience in DevOps practices and cloud technologies.',
        requirements: [
          'Currently pursuing a degree in Computer Science or related field',
          'Basic knowledge of Linux/Unix systems',
          'Interest in cloud technologies (AWS, Azure, GCP)',
          'Some programming experience (Python, Bash)'
        ],
        responsibilities: [
          'Assist in maintaining CI/CD pipelines',
          'Learn about infrastructure as code',
          'Help with monitoring and logging systems',
          'Participate in team meetings and learning sessions'
        ],
        employmentType: EmploymentType.INTERNSHIP,
        experienceLevel: ExperienceLevel.ENTRY,
        postedDate: new Date(2025, 4, 1),
        deadline: new Date(2025, 5, 1),
        status: JobStatus.ACTIVE,
        companyLogo: 'assets/images/companies/cloudtech.png',
        tags: ['DevOps', 'Internship', 'Cloud', 'AWS']
      },
      {
        id: 5,
        title: 'Product Manager',
        company: 'InnovateSoft',
        location: 'Boston, MA',
        description: 'We are looking for an experienced Product Manager to lead our product development efforts.',
        requirements: [
          'At least 3 years of experience in product management',
          'Experience with agile methodologies',
          'Strong analytical and problem-solving skills',
          'Excellent communication and leadership abilities'
        ],
        responsibilities: [
          'Define product vision and strategy',
          'Gather and prioritize requirements',
          'Work closely with development, design, and marketing teams',
          'Analyze market trends and competition'
        ],
        salary: '$110,000 - $140,000',
        employmentType: EmploymentType.FULL_TIME,
        experienceLevel: ExperienceLevel.SENIOR,
        postedDate: new Date(2025, 3, 25),
        deadline: new Date(2025, 4, 25),
        status: JobStatus.ACTIVE,
        companyLogo: 'assets/images/companies/innovatesoft.png',
        tags: ['Product Management', 'Agile', 'Leadership']
      }
    ];

    // Simulate network delay
    return of(dummyJobs).pipe(delay(800));
  }

  // Get job by ID
  getJobById(id: number): Observable<Job | null> {
    // Simulate API call with dummy data
    const dummyJobs = this.getJobs().pipe(delay(0)); // No additional delay
    
    // Find the job with the matching ID
    return new Observable<Job | null>(observer => {
      dummyJobs.subscribe(jobs => {
        const job = jobs.find(j => j.id === id) || null;
        observer.next(job);
        observer.complete();
      });
    }).pipe(delay(500)); // Add a small delay to simulate network
  }

  // Apply for a job
  applyForJob(jobId: number, application: any): Observable<boolean> {
    // Simulate API call for job application
    console.log(`Applying for job ${jobId}`, application);
    
    // Simulate successful application
    return of(true).pipe(delay(1000));
  }

  // Post a new job (for employers)
  postJob(job: Partial<Job>): Observable<Job> {
    // Simulate API call to post a new job
    const newJob: Job = {
      id: Math.floor(Math.random() * 1000) + 6,
      title: job.title || 'New Job Position',
      company: job.company || 'Company Name',
      location: job.location || 'Location',
      description: job.description || 'Job description goes here',
      requirements: job.requirements || ['Requirement 1', 'Requirement 2'],
      responsibilities: job.responsibilities || ['Responsibility 1', 'Responsibility 2'],
      salary: job.salary,
      employmentType: job.employmentType || EmploymentType.FULL_TIME,
      experienceLevel: job.experienceLevel || ExperienceLevel.MID,
      postedDate: new Date(),
      deadline: job.deadline,
      status: JobStatus.ACTIVE,
      companyLogo: job.companyLogo,
      tags: job.tags || []
    };
    
    // Simulate network delay
    return of(newJob).pipe(delay(1000));
  }
}
