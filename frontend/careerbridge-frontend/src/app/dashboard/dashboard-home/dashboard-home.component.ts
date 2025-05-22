import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  // Mock data for dashboard
  recentApplications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      date: new Date('2025-05-15'),
      status: 'Applied'
    },
    {
      id: 2,
      jobTitle: 'UX Designer',
      company: 'Creative Solutions',
      date: new Date('2025-05-10'),
      status: 'Reviewing'
    },
    {
      id: 3,
      jobTitle: 'Product Manager',
      company: 'InnovateTech',
      date: new Date('2025-05-05'),
      status: 'Interview'
    }
  ];

  recommendedJobs = [
    {
      id: 101,
      title: 'Full Stack Developer',
      company: 'Global Systems',
      location: 'Remote'
    },
    {
      id: 102,
      title: 'Frontend Architect',
      company: 'WebSolutions',
      location: 'New York, NY'
    },
    {
      id: 103,
      title: 'UI/UX Developer',
      company: 'DesignHub',
      location: 'San Francisco, CA'
    }
  ];

  upcomingInterviews = [
    {
      id: 201,
      jobTitle: 'Product Manager',
      company: 'InnovateTech',
      date: new Date('2025-05-25T14:00:00')
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // In a real application, these would be loaded from services
    // this.loadDashboardData();
  }

  // Example of how data would be loaded in a real application
  // private loadDashboardData(): void {
  //   this.jobService.getRecentApplications().subscribe(data => {
  //     this.recentApplications = data;
  //   });
  //   
  //   this.jobService.getRecommendedJobs().subscribe(data => {
  //     this.recommendedJobs = data;
  //   });
  //   
  //   this.jobService.getUpcomingInterviews().subscribe(data => {
  //     this.upcomingInterviews = data;
  //   });
  // }
}
