import { Component, Input } from '@angular/core';
import { PokemonType } from '../../models/pokemon.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', '../../../../app.component.css'],
})
export class CardComponent {
  @Input() public pokemon!: PokemonType;
}
