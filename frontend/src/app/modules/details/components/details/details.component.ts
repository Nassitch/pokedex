import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DetailsService } from '../../shared/services/details.service';
import { forkJoin, Observable, Subscription, switchMap, tap } from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/modules/card/shared/services/card.service';
import { Ability } from 'src/app/modules/card/models/ability.type';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';
import { FavoriteService } from 'src/app/modules/favorite/shared/favorite.service';
import { Meta, Title } from '@angular/platform-browser';

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
  private title = inject(Title);
  private meta = inject(Meta);

  pokemon$!: Observable<PokemonType>;
  abilityList$!: Observable<Ability[]>;

  postSubscription$: Subscription = new Subscription();

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemon$ = this.detailsService.getDetailPokemonById$(id).pipe(
      tap((pokemon: PokemonType) => {
        this.title.setTitle(`${pokemon.name} details.`);
        this.meta.updateTag({ name: 'description', content: `View all informations about ${pokemon.name}.` });
        this.meta.updateTag({ name: 'keywords', content: `View, add favorite, ${pokemon.name}, data` });
      })
    );

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
      next: () =>
        this.toastService.success('Your favorite is successfully added.'),
      error: () =>
        this.toastService.error(
          'You already have this pokemon in your favorites.'
        ),
    });
  }

  ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
  }
}
