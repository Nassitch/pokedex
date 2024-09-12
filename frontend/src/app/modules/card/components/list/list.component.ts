import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { PokemonType } from '../../models/pokemon.type';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  protected cardService = inject(CardService);
  protected router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);

  pokemonList$!: Observable<PokemonType[] | null>;

  private pokemonSub: Subscription = new Subscription();

  ngOnInit() {
    this.title.setTitle('Pokedex - by David & Nassime.');
    this.meta.updateTag({ name: 'description', content: `Navigate and view all pokemon cards.` });
    this.meta.updateTag({ name: 'keywords', content: `View, pokemons, pokemon cards, data` });

    this.pokemonList$ = this.cardService._pokemonDetails$;

    this.pokemonSub = this.cardService.getPokemonList$().subscribe();
  }

  ngOnDestroy(): void {
    this.pokemonSub.unsubscribe();
  }
}
