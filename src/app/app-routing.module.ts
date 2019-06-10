import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: './pages/todo/list/list.module#ListPageModule' },
  { path: 'create-update', loadChildren: './pages/todo/create-update/create-update.module#CreateUpdatePageModule' },
  { path: 'details', loadChildren: './pages/todo/details/details.module#DetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
