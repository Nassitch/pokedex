import { Injectable } from '@angular/core';
import { ToastComponent } from './toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastComponent!: ToastComponent;
  constructor() {
}

  setToastComponent(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  success(message: string) {
    this.toastComponent.showToast(message, "Succès", "success");
  }
  error(message: string) {
    this.toastComponent.showToast(message, "Erreur", "error");
  }
}
