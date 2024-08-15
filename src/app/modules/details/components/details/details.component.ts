import { Component, inject, OnInit } from '@angular/core';
import { DetailsService } from '../../shared/services/details.service';
import { Observable } from 'rxjs';
import { PokemonType } from 'src/app/modules/card/models/pokemon.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private detailsService = inject(DetailsService);
  private route = inject(ActivatedRoute);

  pokemon$!: Observable<PokemonType>;

  ngOnInit(): void {

    const id: number = Number(this.route.snapshot.paramMap.get("id"));

    this.pokemon$ = this.detailsService.getDetailPokemonById$(id);
  }
}
