import { Component, inject } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { PokemonType } from '../../models/pokemon.type';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  protected cardService = inject(CardService);
  protected router = inject(Router);

  pokemonList$!: Observable<PokemonType[] | null>;

  ngOnInit() {
    this.pokemonList$ = this.cardService._pokemonDetails$;

    this.cardService.getPokemonList$().subscribe()
  }

  goSearch() {
    return this.router.navigate(['/search'])
  }
}
