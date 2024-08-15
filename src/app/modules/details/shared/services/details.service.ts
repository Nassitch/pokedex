import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private http = inject(HttpClient);

  private readonly _BASE_URL: string = 'https://pokeapi.co/api/v2/';
  private readonly _POKEMON: string = 'pokemon/';

  getDetailPokemonById$(id: number): Observable<PokemonType> {
    return this.http.get<PokemonType>(`${this._BASE_URL}${this._POKEMON}${id}`)
  }
}
