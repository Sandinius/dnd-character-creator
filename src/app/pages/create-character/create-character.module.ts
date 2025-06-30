import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCharacterPageRoutingModule } from './create-character-routing.module';

import { CreateCharacterPage } from './create-character.page';
import { InitialSettingComponent } from './initial-setting/initial-setting.component';
import { ClassOptionsComponent } from './class-options/class-options.component';
import { StatsCreationComponent } from './stats-creation/stats-creation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCharacterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateCharacterPage,InitialSettingComponent,ClassOptionsComponent,StatsCreationComponent],
  exports: [InitialSettingComponent, ClassOptionsComponent, StatsCreationComponent]
})
export class CreateCharacterPageModule {}
