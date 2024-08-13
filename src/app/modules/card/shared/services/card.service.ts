import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

 private http = inject(HttpClient);

 private readonly _BASE_URL: string = "https://pokeapi.co/api/v2/";
 private readonly _POKEMON_LIST: string = "pokemon?limit=12&offset=0";
 
 getPokemonList$(): Observable<any> {
  return this.http.get<any>(`${this._BASE_URL}${this._POKEMON_LIST}`).pipe(
    switchMap((pokemons: any) => {
      const pokemonUrls = pokemons.results.map((pokemon: any) => pokemon.url);

      const pokemonDetails$ = pokemonUrls.map((url :string)=> this.http.get<any>(url))

      return forkJoin(pokemonDetails$);
    })
  )
}

}