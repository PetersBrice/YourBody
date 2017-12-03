import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListseanceComponent} from './listseance/listseance.component';
import {SeanceComponent} from './seance/seance.component';

// APP COMPONENTS
const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'seances', component: ListseanceComponent },
  { path: 'seance/:id', component: SeanceComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
