import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DetailsService } from '../../shared/services/details.service';
import { forkJoin, Observable, Subscription, switchMap } from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/modules/card/shared/services/card.service';
import { Ability } from 'src/app/modules/card/models/ability.type';
import { ToastService } from 'src/app/modules/toast/toast.service';
import { FavoriteService } from 'src/app/modules/favorite/shared/favorite.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private detailsService = inject(DetailsService);
  private favoriteService = inject(FavoriteService);
  private cardService = inject(CardService);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  pokemon$!: Observable<PokemonType>;
  abilityList$!: Observable<Ability[]>;

  postSubscription$: Subscription = new Subscription();

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemon$ = this.detailsService.getDetailPokemonById$(id);

    this.abilityList$ = this.pokemon$.pipe(
      switchMap((pokemon) => {
        const abilityObservables: Observable<Ability>[] = pokemon.abilities.map(
          (abilityItem: { ability: { url: string } }) =>
            this.cardService.getAbilitiesList$(abilityItem.ability.url)
        );
        return forkJoin(abilityObservables);
      })
    );
  }

  addToFavorite(id: number) {
    this.postSubscription$ = this.favoriteService.postFavorite$(id).subscribe({
      next: () => this.toastService.success("Favoris ajouté avec succés !"),
      error: () => this.toastService.error("Une erreur s'est produite !")
    })
  }

  ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
  }
}
