import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment.development';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { FavoriteCard } from 'src/app/modules/favorite/models/favorite.card.type';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private http = inject(HttpClient);

  private readonly _API_URL: string = environment._API_URL;
  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _POKEMON: string = environment._POKEMON;
  private readonly _FAVORITE: string = environment._FAVORITE;

  getDetailPokemonById$(id: number): Observable<PokemonType> {
    return this.http.get<PokemonType>(`${this._API_URL}${this._POKEMON}${id}`)
  }
}
