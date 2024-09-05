import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIcon',
})
export class TypeIconPipe implements PipeTransform {
  private availableIcons = new Set<string>([
    'normal',
    'fire',
    'water',
    'grass',
    'psychic',
    'electrik',
  ]);

  transform(
    types: { slot: number; type: { name: string; url: string } }[],
  ): string[] {
    return types.map((typeObj) => this.getIconPath(typeObj.type.name));
  }

  private getIconPath(typeName: string): string {
    if (this.availableIcons.has(typeName)) {
      return `assets/icons/type_${typeName}.jpg`;
    }
    return `assets/icons/type_normal.jpg`;
  }
}
