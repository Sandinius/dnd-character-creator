import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadCharactersPage } from './load-characters.page';

const routes: Routes = [
  {
    path: '',
    component: LoadCharactersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadCharactersPageRoutingModule {}
