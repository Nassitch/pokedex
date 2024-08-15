import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { TypeCardColorPipe } from './shared/pipes/type-card-color.pipe';
import { DetailsModule } from '../details/details.module';


@NgModule({
  declarations: [
    CardComponent,
    ListComponent,
    TypeCardColorPipe,
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    DetailsModule,
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
