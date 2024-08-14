import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, switchMap, tap } from 'rxjs';
import { PokemonType } from '../../models/pokemon.type';
import {
  pokemonAttribut,
  PokemonListType,
} from '../../models/pokemon-list.type';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public _pokemonDetails$: BehaviorSubject<PokemonType[] | null> = new BehaviorSubject<PokemonType[] | null>(null);

  private http = inject(HttpClient);

  private readonly _BASE_URL: string = 'https://pokeapi.co/api/v2/';

  private limit: number = 12;
  private offset: number = 0;

  getPokemonList$(): Observable<PokemonType[]> {
    return this.http
      .get<PokemonListType>(
        `${this._BASE_URL}pokemon?limit=${this.limit}&offset=${this.offset}`
      )
      .pipe(
        switchMap((pokemons: PokemonListType) => {
          const pokemonUrls = pokemons.results.map(
            (pokemon: pokemonAttribut) => pokemon.url
          );

          const pokemonDetails$ = pokemonUrls.map((url: string) =>
            this.http.get<PokemonType>(url)
          );

          return forkJoin(pokemonDetails$).pipe(tap(res => {
            this._pokemonDetails$.next(res)
          }));
        })
      );
  }

  nextPage(): void {
    this.limit += 12;
    this.offset += 12;
    this.getPokemonList$().subscribe();
  }
  
}
