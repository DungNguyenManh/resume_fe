import { Routes } from '@angular/router';
import { CvPageComponent } from './pages/cv-page/cv-page.component';
import { langRedirectGuard } from './core/guards/lang-redirect.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'en' },
  { path: ':lang', component: CvPageComponent, canActivate: [langRedirectGuard] },
  { path: '**', redirectTo: 'en' }
];
