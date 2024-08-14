import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './components/card/card.component';
import { TypeColorPipe } from './shared/pipes/type-color.pipe';
import { ListComponent } from './components/list/list.component';
import { TypeCardColorPipe } from './shared/pipes/type-card-color.pipe';


@NgModule({
  declarations: [
    CardComponent,
    TypeColorPipe,
    ListComponent,
    TypeCardColorPipe
  ],
  imports: [
    CommonModule,
    CardRoutingModule
  ]
})
export class CardModule { }
