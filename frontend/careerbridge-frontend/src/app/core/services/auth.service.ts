import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, UserRole } from '../models/user.model';

interface GraphQLResponse<T> {
  data: T;
}

interface LoginResponse {
  login: AuthResponse;
}

interface RegisterResponse {
  register: AuthResponse;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenKey = 'auth_token';
  
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userJson = localStorage.getItem('current_user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing stored user data', e);
        this.logout().subscribe();
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<GraphQLResponse<LoginResponse>>(`${this.apiUrl}/graphql`, {
      query: `
        mutation Login($loginInput: LoginDto!) {
          login(loginInput: $loginInput) {
            user {
              id
              email
              firstName
              lastName
              role
            }
            accessToken
          }
        }
      `,
      variables: {
        loginInput: { email, password }
      }
    }).pipe(
      map(response => {
        const authData = response.data?.login;
        if (!authData) {
          throw new Error('Invalid response from server');
        }
        
        // Store token and user data
        localStorage.setItem(this.tokenKey, authData.accessToken);
        localStorage.setItem('current_user', JSON.stringify(authData.user));
        
        // Update current user
        this.currentUserSubject.next(authData.user);
        
        return authData.user;
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error(error.message || 'Login failed'));
      })
    );
  }

  register(user: Partial<User> & { password?: string }): Observable<User> {
    return this.http.post<GraphQLResponse<RegisterResponse>>(`${this.apiUrl}/graphql`, {
      query: `
        mutation Register($registerInput: RegisterDto!) {
          register(registerInput: $registerInput) {
            user {
              id
              email
              firstName
              lastName
              role
            }
            accessToken
          }
        }
      `,
      variables: {
        registerInput: {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role || UserRole.JOB_SEEKER
        }
      }
    }).pipe(
      map(response => {
        const authData = response.data?.register;
        if (!authData) {
          throw new Error('Invalid response from server');
        }
        
        // Store token and user data
        localStorage.setItem(this.tokenKey, authData.accessToken);
        localStorage.setItem('current_user', JSON.stringify(authData.user));
        
        // Update current user
        this.currentUserSubject.next(authData.user);
        
        return authData.user;
      }),
      catchError(error => {
        console.error('Registration error', error);
        return throwError(() => new Error(error.message || 'Registration failed'));
      })
    );
  }

  logout(): Observable<boolean> {
    // Clear stored data
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('current_user');
    
    // Update current user
    this.currentUserSubject.next(null);
    
    return of(true);
  }

  forgotPassword(email: string): Observable<boolean> {
    // This would typically call a password reset endpoint
    // For now, we'll just return success
    return of(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value && !!localStorage.getItem(this.tokenKey);
  }

  getUserRole(): UserRole | null {
    return this.currentUserSubject.value?.role || null;
  }
  
  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
