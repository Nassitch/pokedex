import { Component, inject, OnDestroy } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { BehaviorSubject, debounceTime, Observable, Subscription, tap} from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnDestroy {

  private searchService = inject(SearchService);
  private router = inject(Router);
  
  searchTerms = new BehaviorSubject<any>(null);
  
  pokemonCardList$!: Observable<PokemonType[]>;

  private pokemonSub: Subscription = new Subscription();

  searchPokemon(name: string): Observable<PokemonType> {
    return this.searchService.getPokemonByName$(name).pipe(
      debounceTime(1000),
      tap(result => this.searchTerms.next(result))
    )
   }

  search(term: string) {
    this.pokemonSub = this.searchPokemon(term).subscribe();
    this.searchTerms.next(this.pokemonSub);
    console.log(this.searchTerms.getValue());
  }

  seeDetails(id: number): void {
    this.router.navigate([`/details/${id}`])
  }

  ngOnDestroy(): void {
    this.pokemonSub.unsubscribe();
  }
}
