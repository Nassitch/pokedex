import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';



@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ToastComponent]

})
export class ToastModule { }
