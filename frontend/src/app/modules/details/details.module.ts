import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './components/details/details.component';
import { TypeColorPipe } from './shared/pipes/type-color.pipe';

@NgModule({
  declarations: [DetailsComponent, TypeColorPipe],
  imports: [CommonModule, DetailsRoutingModule],
  exports: [TypeColorPipe],
})
export class DetailsModule {}
