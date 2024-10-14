import { Routes } from '@angular/router';
import { PokedexComponent } from './views/pokedex.component';
import { DashboardComponent } from './views/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'pokedex', component: PokedexComponent }
];
