import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { PokemonType } from '../../models/pokemon.type';
import { Observable, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  protected cardService = inject(CardService);
  protected router = inject(Router);

  pokemonList$!: Observable<PokemonType[] | null>;

  private pokemonSub: Subscription = new Subscription();

  ngOnInit() {
    this.pokemonList$ = this.cardService._pokemonDetails$;

    this.pokemonSub = this.cardService.getPokemonList$().subscribe()
  }

  ngOnDestroy(): void {
    this.pokemonSub.unsubscribe();
  }
}
