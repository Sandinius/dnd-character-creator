import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCharacterPageRoutingModule } from './create-character-routing.module';

import { CreateCharacterPage } from './create-character.page';
import { InitialSettingComponent } from './initial-setting/initial-setting.component';
import { ClassOptionsComponent } from './class-options/class-options.component';
import { StatsCreationComponent } from './stats-creation/stats-creation.component';
import { ProficienciesSelectionComponent } from './proficiencies-selection/proficiencies-selection.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCharacterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateCharacterPage,InitialSettingComponent,ClassOptionsComponent,StatsCreationComponent,ProficienciesSelectionComponent],
  exports: [InitialSettingComponent, ClassOptionsComponent, StatsCreationComponent, ProficienciesSelectionComponent]
})
export class CreateCharacterPageModule {}
