import { Component, inject, Input, OnInit } from '@angular/core';
import { PokemonType } from '../../models/pokemon.type';
import { CardService } from '../../shared/services/card.service';
import { forkJoin, Observable } from 'rxjs';
import { Ability } from '../../models/ability.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() public pokemon!: PokemonType;

  private cardService = inject(CardService);
  private router = inject(Router);

  abilityList$!: Observable<Ability[]>;

  ngOnInit(): void {
    const abilityObservables: Observable<Ability>[] =
      this.pokemon.abilities.map((abilityItem) =>
        this.cardService.getAbilitiesList$(abilityItem.ability.url)
      );

    this.abilityList$ = forkJoin(abilityObservables);
  }

  seeDetails(id: number): void {
    this.router.navigate([`/details/${id}`])
  }
  
}
