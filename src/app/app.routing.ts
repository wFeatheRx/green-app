import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
  { path: 'place', loadComponent: () => import('./place/place.component').then(c => c.PlaceComponent) },
  { path: 'explore', loadComponent: () => import('./explore/explore.component').then(c => c.ExploreComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent) },
  { path: 'commute', loadComponent: () => import('./commute/commute.component').then(c => c.CommuteComponent) },
  { path: 'faq', loadComponent: () => import('./faq/faq.component').then(c => c.FaqComponent) },
  { path: 'settings', loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent) },
  { path: 'place/:title', loadComponent: () => import('./guide/guide.component').then(c => c.GuideComponent) },
  { path: 'explore/:title', loadComponent: () => import('./guide/guide.component').then(c => c.GuideComponent) },
];

