import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private isAuthenticated = false;

  constructor() { }

  login(email: string, password: string): Observable<User> {
    // Simulate API call with dummy data
    const dummyUser: User = {
      id: 1,
      email: email,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.JOB_SEEKER,
      title: 'Software Developer',
      location: 'New York, NY',
      profileImage: 'assets/images/profile-placeholder.jpg',
      skills: ['JavaScript', 'Angular', 'TypeScript', 'HTML', 'CSS'],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Simulate successful login
    this.currentUser = dummyUser;
    this.isAuthenticated = true;
    
    // Simulate network delay
    return of(dummyUser).pipe(delay(800));
  }

  register(user: Partial<User>): Observable<User> {
    // Simulate API call with dummy data
    const newUser: User = {
      id: Math.floor(Math.random() * 1000) + 1,
      email: user.email || 'new@example.com',
      firstName: user.firstName || 'New',
      lastName: user.lastName || 'User',
      role: user.role || UserRole.JOB_SEEKER,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Simulate successful registration
    this.currentUser = newUser;
    this.isAuthenticated = true;
    
    // Simulate network delay
    return of(newUser).pipe(delay(800));
  }

  logout(): Observable<boolean> {
    // Simulate logout
    this.currentUser = null;
    this.isAuthenticated = false;
    
    // Simulate network delay
    return of(true).pipe(delay(500));
  }

  forgotPassword(email: string): Observable<boolean> {
    // Simulate password reset request
    return of(true).pipe(delay(800));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): UserRole | null {
    return this.currentUser?.role || null;
  }
}
