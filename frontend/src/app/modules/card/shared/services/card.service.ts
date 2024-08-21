import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subscription, switchMap, tap } from 'rxjs';
import { PokemonType } from '../../models/pokemon.type';
import { pokemonAttribut, PokemonListType } from '../../models/pokemon-list.type';
import { Ability } from '../../models/ability.type';
import { environment } from 'src/app/environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CardService implements OnDestroy {
  public _pokemonDetails$: BehaviorSubject<PokemonType[] | null> = new BehaviorSubject<PokemonType[] | null>(null);

  private http = inject(HttpClient);

  private readonly _API_URL: string = environment._API_URL;

  private limit: number = 12;
  private offset: number = 0;
  public pageNbr: number = 1;

  private pokemonSub: Subscription = new Subscription();

  getPokemonList$(): Observable<PokemonType[]> {
    return this.http
      .get<PokemonListType>(
        `${this._API_URL}pokemon?limit=${this.limit}&offset=${this.offset}`
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

  getAbilitiesList$(url: string): Observable<Ability> {
    return this.http.get<Ability>(url);
  }

  previousPage(): void {
    if (this.offset !== 0) {
      this.limit -= 12;
      this.offset -= 12;
      this.pageNbr -= 1;
      this.pokemonSub = this.getPokemonList$().subscribe();
    }
  }

  nextPage(): void {
    this.limit += 12;
    this.offset += 12;
    this.pageNbr += 1;
    this.pokemonSub = this.getPokemonList$().subscribe();
  }

  ngOnDestroy(): void {
    this.pokemonSub.unsubscribe();
  }
}
