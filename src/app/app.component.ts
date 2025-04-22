import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AuthComponent } from './auth/auth.component';
import { SupabaseService } from './services/supabase.service';
declare var bootstrap: any; // Declaración para Bootstrap JS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MapComponent, AuthComponent],
  template: `
  <ng-container *ngIf="(supabaseService.user$ | async) as user; else auth">
    <!-- Botón que activa el Offcanvas -->
    <button
        class="btn btn-primary m-2 menu-trigger-button"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasMenu"
        aria-controls="offcanvasMenu">
        ☰ Menu
      </button>

      <!-- Definición del Offcanvas -->
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <p>Opciones del menú aquí...</p>
          <button
            class="btn btn-danger"
            (click)="signOut()">
            Sign Out
          </button>
          <!-- Puedes añadir más elementos al menú aquí -->
          <p class="mt-3">
            <small>Este menú usa Bootstrap JS nativo.</small>
          </p>
        </div>
      </div>
      <app-map></app-map>
      </ng-container>

    <ng-template #auth>
      <app-auth></app-auth>
    </ng-template>
  `,
  styles: [`
    .menu-trigger-button {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 1000; /* Asegura que esté sobre el mapa */
    }
  `]
})
export class AppComponent {
  public supabaseService = inject(SupabaseService);
  constructor() {}

  async signOut() {
    try {
      // Cerrar el menú offcanvas
      const offcanvasElement = document.getElementById('offcanvasMenu');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) {
        offcanvas.hide();
      }
      
      // Cerrar sesión
      await this.supabaseService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
