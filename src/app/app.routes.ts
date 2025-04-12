import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { path: 'game', loadComponent: () => import('./pages/game/game.component').then(c => c.GameComponent) },
];
