import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="email"
              name="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              required
            />
          </div>

          <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
          
          <p class="toggle-text">
            {{ isLogin ? 'Need an account?' : 'Already have an account?' }}
            <a href="#" (click)="toggleAuthMode($event)">
              {{ isLogin ? 'Sign Up' : 'Login' }}
            </a>
          </p>

          <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }

    .auth-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
    }

    button:hover {
      background-color: #0056b3;
    }

    .toggle-text {
      text-align: center;
      margin-top: 1rem;
    }

    .error-message {
      color: #dc3545;
      text-align: center;
      margin-top: 1rem;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `]
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  isLogin: boolean = true;
  errorMessage: string = '';

  constructor(private supabaseService: SupabaseService) {}

  async onSubmit() {
    try {
      if (this.isLogin) {
        await this.supabaseService.signIn(this.email, this.password);
      } else {
        await this.supabaseService.signUp(this.email, this.password);
      }
      this.errorMessage = '';
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  toggleAuthMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }
}