import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeCardColor',
})
export class TypeCardColorPipe implements PipeTransform {
  transform(type: string): string {
    let cardColor: string;

    switch (type) {
      case 'fire':
        cardColor = 'fire_card.png';
        break;
      case 'water':
        cardColor = 'water_card.png';
        break;
      case 'grass':
        cardColor = 'grass_card.png';
        break;
      case 'electric':
        cardColor = 'lightning_card.png';
        break;
      case 'fighting':
        cardColor = 'fighting_card.png';
        break;
      default:
        cardColor = 'dragon_card.png';
        break;
    }

    return '../../assets/cards/' + cardColor;
  }
}
