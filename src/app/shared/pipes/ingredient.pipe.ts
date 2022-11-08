import { Pipe, PipeTransform } from '@angular/core';
import { UNITS } from '../constants';

import { IngredientsQuantityDto } from '../interfaces';

@Pipe({
  name: 'ingredient'
})
export class IngredientPipe implements PipeTransform {

  transform(value: IngredientsQuantityDto, ...args: unknown[]): unknown {
    let ingredientName = (value.name.startsWith('d\'') || value.name.startsWith('de') || !value.unit || value.unit === 'pièce')
      ? value.name 
      : ('de ' + value.name);
    let unit = value.unit === 'pièce' ? '' : value.unit;
    return `${value.quantity || ''} ${unit || ''} ${ingredientName}`;
  }

}
