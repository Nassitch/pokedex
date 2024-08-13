import { Component, inject, OnInit } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { Observable, tap } from 'rxjs';
import { PokemonType } from '../../models/pokemon.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  private cardService = inject(CardService);

  pokemonList!: PokemonType[];

  pokemon$!: Observable<PokemonType[]>;

  ngOnInit() {
    // this.cardService
    //   .getPokemonList$()
    //   .pipe(
    //     tap((res) => {
    //       console.log(res);
    //       this.pokemonList = res;
    //     })
    //   )
    //   .subscribe();

    this.pokemon$ = this.cardService.getPokemonList$().pipe(
      tap((res) => {
        console.log(res);
        this.pokemonList = res;
      })
    );
  }
}
