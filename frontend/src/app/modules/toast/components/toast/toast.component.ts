import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate('300ms ease-in')
      ]),
      transition('* => void', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  toasts: any[] = [];

  private toastService = inject(ToastService)

  ngOnInit(): void {
    this.toastService.setToastComponent(this)
  }

  showToast(message: string, title: string, type: string): void {
    this.toasts.push({ message, title, type })
    setTimeout(() => this.removeToast(this.toasts[0]), 8000)
  }

  removeToast(toast: any) {
    this.toasts= this.toasts.filter(t => t !== toast)
  }
}
