import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {

  transform(type: string): string {

    let color: string;

    switch (type) {
      case 'fire':
        color = 'red-lighten-1';
        break;
      case 'water':
        color = 'blue-lighten-1';
        break;
      case 'grass':
        color = 'green-lighten-1';
        break;
      case 'bug':
        color = 'brown-lighten-1';
        break;
      case 'normal':
        color = 'grey-lighten-3';
        break;
      case 'flying':
        color = 'blue-lighten-3';
        break;
      case 'poison':
        color = 'deep-purple-accent-1';
        break;
      case 'fairy':
        color = 'pink-lighten-4';
        break;
      case 'ground':
        color = 'deep-purple-darken-2';
        break;
      case 'electric':
        color = 'lime-accent-1';
        break;
      case 'fighting':
        color = 'deep-orange';
        break;
      case 'psychic':
        color = 'teal';
        break;
      default:
        color = 'grey';
        break;
    }

    return color;

  }

}
