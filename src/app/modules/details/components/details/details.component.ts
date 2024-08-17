import { Component, inject, OnInit } from '@angular/core';
import { DetailsService } from '../../shared/services/details.service';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/modules/card/shared/services/card.service';
import { Ability } from 'src/app/modules/card/models/ability.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private detailsService = inject(DetailsService);
  private cardService = inject(CardService);
  private route = inject(ActivatedRoute);

  pokemon$!: Observable<PokemonType>;
  abilityList$!: Observable<Ability[]>;

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
}
