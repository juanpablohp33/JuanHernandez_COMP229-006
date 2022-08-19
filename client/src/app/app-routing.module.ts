import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreFirstGuard } from './guards/storeFirst.guard';

const routes: Routes = [
  {path: 'store', loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule)},
  {path: '', loadChildren: () => import('./external/external-layout.module').then(m => m.ExternalLayoutModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ StoreFirstGuard]
})
export class AppRoutingModule { }
