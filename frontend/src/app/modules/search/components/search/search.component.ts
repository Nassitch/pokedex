import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { BehaviorSubject, debounceTime, Observable, Subscription, tap } from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private searchService = inject(SearchService);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);

  searchTerms = new BehaviorSubject<PokemonType | null>(null);

  pokemonCardList$!: Observable<PokemonType[]>;

  private pokemonSub: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.title.setTitle('Seach');
    this.meta.updateTag({ name: 'description', content: 'Search your favorite pokemons into Pokedex.' });
    this.meta.updateTag({ name: 'keywords', content: 'Pokedex, search, Pokemons, details, pokemon card.' });
  }

  searchPokemon(name: string): Observable<PokemonType> {
    return this.searchService.getPokemonByName$(name.toLowerCase()).pipe(
      debounceTime(3000),
      tap((result) => this.searchTerms.next(result)),
    );
  }

  search(term: string) {
    this.pokemonSub = this.searchPokemon(term).subscribe();
  }

  seeDetails(id: number): void {
    this.router.navigate([`/details/${id}`]);
  }

  ngOnDestroy(): void {
    this.pokemonSub.unsubscribe();
  }
}
