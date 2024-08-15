import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'search', loadChildren: () => import("./modules/search/search.module").then((m) => m.SearchModule)},
  {path:'details', loadChildren: () => import("./modules/details/details.module").then((m) => m.DetailsModule)},
  {path:'', loadChildren: () => import("./modules/card/card.module").then((m) => m.CardModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
