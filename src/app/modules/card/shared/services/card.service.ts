import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { PokemonType } from '../../models/pokemon.type';
import { pokemonAttribut, PokemonListType } from '../../models/pokemon-list.type';

@Injectable({
  providedIn: 'root'
})
export class CardService {

 private http = inject(HttpClient);

 private readonly _BASE_URL: string = "https://pokeapi.co/api/v2/";
 private readonly _POKEMON_LIST: string = "pokemon?limit=12&offset=0";
 
 getPokemonList$(): Observable<PokemonType[]> {
  return this.http.get<PokemonListType>(`${this._BASE_URL}${this._POKEMON_LIST}`).pipe(
    switchMap((pokemons: PokemonListType) => {
      const pokemonUrls = pokemons.results.map((pokemon: pokemonAttribut) => pokemon.url);

      const pokemonDetails$ = pokemonUrls.map((url :string)=> this.http.get<PokemonType>(url))

      return forkJoin(pokemonDetails$);
    })
  )
}

}