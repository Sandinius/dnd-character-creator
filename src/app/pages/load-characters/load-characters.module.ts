import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadCharactersPageRoutingModule } from './load-characters-routing.module';

import { LoadCharactersPage } from './load-characters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadCharactersPageRoutingModule
  ],
  declarations: [LoadCharactersPage]
})
export class LoadCharactersPageModule {}
