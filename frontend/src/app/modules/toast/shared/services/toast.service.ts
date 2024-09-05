import { Injectable } from '@angular/core';
import { ToastComponent } from '../../components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent!: ToastComponent;

  setToastComponent(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  success(message: string) {
    this.toastComponent.showToast(message, 'Success', 'success');
  }
  error(message: string) {
    this.toastComponent.showToast(message, 'Error', 'error');
  }
}
