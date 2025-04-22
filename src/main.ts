import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { SupabaseService } from './app/services/supabase.service';

bootstrapApplication(AppComponent, {
  providers: [SupabaseService]
});
