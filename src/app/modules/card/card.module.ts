import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './components/card/card.component';
import { TypeColorPipe } from './shared/pipes/type-color.pipe';


@NgModule({
  declarations: [
    CardComponent,
    TypeColorPipe
  ],
  imports: [
    CommonModule,
    CardRoutingModule
  ]
})
export class CardModule { }
