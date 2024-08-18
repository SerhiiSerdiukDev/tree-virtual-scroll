import { Routes } from '@angular/router';
import { TreeComponent } from './tree/tree.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tree', pathMatch: 'full' },
  { path: 'tree', component: TreeComponent },
];
