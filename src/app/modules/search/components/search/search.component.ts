import { Component, inject } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { BehaviorSubject, debounceTime, Observable, tap} from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  private searchService = inject(SearchService);
  private router = inject(Router);

  searchTerms = new BehaviorSubject<any>(null);

  pokemonCardList$!: Observable<PokemonType[]>;

  searchPokemon(name: string): Observable<PokemonType> {
    return this.searchService.getPokemonByName$(name).pipe(
      debounceTime(300),
      tap(result => this.searchTerms.next(result))
    )
   }

  search(term: string) {
    const searched = this.searchPokemon(term).subscribe();
    this.searchTerms.next(searched);
    console.log(this.searchTerms.getValue());
  }

  seeDetails(id: number): void {
    this.router.navigate([`/details/${id}`])
  }

  goBack(): void {
    this.router.navigate(['/'])
  }
}
