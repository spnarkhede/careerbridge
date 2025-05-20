export interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: ApplicationStatus;
  resumeUrl?: string;
  coverLetter?: string;
  appliedDate: Date;
  lastUpdated: Date;
  notes?: string;
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  REVIEWING = 'Reviewing',
  INTERVIEW = 'Interview',
  OFFER = 'Offer',
  REJECTED = 'Rejected',
  WITHDRAWN = 'Withdrawn'
}
