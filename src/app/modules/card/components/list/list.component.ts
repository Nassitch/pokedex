import { Component, inject } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { PokemonType } from '../../models/pokemon.type';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  protected cardService = inject(CardService);

  pokemonList$!: Observable<PokemonType[] | null>;

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

    // this.pokemonList$ = this.cardService.getPokemonList$().pipe(
    //   tap((res) => {
    //     console.log(res)
    //   })
    // );

    this.pokemonList$ = this.cardService._pokemonDetails$;

    this.cardService.getPokemonList$().subscribe()
  }
}
