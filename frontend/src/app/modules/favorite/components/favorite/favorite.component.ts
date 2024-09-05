import { Component, inject, OnInit } from '@angular/core';
import { FavoriteService } from '../../shared/favorite.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { CardService } from 'src/app/modules/card/shared/services/card.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  protected refreshFavoriteList$ = new BehaviorSubject<void>(undefined);

  protected cardService = inject(CardService);
  protected router = inject(Router);
  private favoriteService = inject(FavoriteService);
  private toastService = inject(ToastService);

  deleteSubscription$: Subscription = new Subscription();

  favoriteList$!: Observable<PokemonType[]>;

  ngOnInit(): void {
    this.favoriteList$ = this.refreshFavoriteList$.pipe(
      switchMap(() => this.favoriteService.getAllFavorite$()),
    );
  }

  deleteFavorite(id: number) {
    this.deleteSubscription$ = this.favoriteService
      .deleteFavorite$(id)
      .subscribe({
        next: () => {
          this.toastService.success('Favorite deleted correctly.');
          this.refreshFavoriteList$.next();
        },
        error: () => this.toastService.error('An error has occurred.'),
      });
  }
}
