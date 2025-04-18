import { Component, ElementRef, HostListener } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MapComponent } from './app/map.component';
import { AuthComponent } from './app/auth/auth.component';
import { CommonModule } from '@angular/common';
import { SupabaseService } from './app/services/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MapComponent, AuthComponent],
  template: `
    <ng-container *ngIf="(supabaseService.user$ | async) as user; else auth">
      <div class="sidenav" [class.open]="isMenuOpen" #sidenav>
        <button 
          class="logout-button"
          (click)="signOut()">
          Sign Out
        </button>
      </div>
      <button 
        class="menu-button"
        (click)="toggleMenu()"
        #menuButton>
        ☰
      </button>
      <app-map></app-map>
    </ng-container>
    <ng-template #auth>
      <app-auth></app-auth>
    </ng-template>
  `,
})
export class App {
  isMenuOpen = false;

  constructor(
    public supabaseService: SupabaseService,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const sidenavElement = this.elementRef.nativeElement.querySelector('.sidenav');
    const menuButtonElement = this.elementRef.nativeElement.querySelector('.menu-button');
    
    if (this.isMenuOpen && 
        !sidenavElement.contains(event.target) && 
        !menuButtonElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async signOut() {
    try {
      await this.supabaseService.signOut();
      this.isMenuOpen = false;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}

bootstrapApplication(App, {
  providers: [SupabaseService]
});