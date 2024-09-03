import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { FavoriteCard } from '../models/favorite.card.type';
import { environment } from 'src/app/environment/environment.development';
import { PokemonType } from '../../card/models/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  public _pokemonDetails$: BehaviorSubject<PokemonType[] | null> = new BehaviorSubject<PokemonType[] | null>(null);

  private http = inject(HttpClient);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _API_URL: string = environment._API_URL;
  private readonly _FAVORITE: string = environment._FAVORITE;
  private readonly _POKEMON: string = environment._POKEMON;


  getAllFavorite$(): Observable<PokemonType[]> {
    return this.http.get<FavoriteCard[]>(`${this._BASE_URL}${this._FAVORITE}`).pipe(
      switchMap((favoriteCards: FavoriteCard[]) => {
        const cardsId = favoriteCards.map((favoriteCard: FavoriteCard) => favoriteCard.ref);

        const getRef$ = cardsId.map((ref) => this.getPokemonCard$(ref));

        return forkJoin(getRef$).pipe(
          map((pokemonArray: PokemonType[][]) => pokemonArray.flat())
        )
      })
    );
  }

  getPokemonCard$(id: number): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>(`${this._API_URL}${this._POKEMON}${id}`);
  }

  postFavorite$(id: number): Observable<FavoriteCard> {
    const pokemon = "";
    return this.http.post<FavoriteCard>(`${this._BASE_URL}${this._FAVORITE}${id}`, pokemon)
  }

  deleteFavorite$(id: number): Observable<FavoriteCard> {
    return this.http.delete<FavoriteCard>(`${this._BASE_URL}${this._FAVORITE}${id}`);
  }
}
