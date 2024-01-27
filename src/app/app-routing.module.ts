import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: 'main-page', loadComponent: () => import('./components/main-page/main-page.component').then((m) => m.MainPageComponent), title: 'main-page' },
  { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent), title: 'notFound' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
