import { Pipe, PipeTransform } from '@angular/core';

import { IngredientsQuantityDto } from '../interfaces';

@Pipe({
  name: 'ingredient'
})
export class IngredientPipe implements PipeTransform {

  transform(value: IngredientsQuantityDto, ...args: unknown[]): unknown {
    let ingredientName = (value.name.startsWith('d\'') || value.name.startsWith('de') || value.unit === '')
      ? value.name 
      : ('de ' + value.name);
    // if (value.quantity > 1 && value.unit === '' && !ingredientName.endsWith('s') && !ingredientName.endsWith('x')) {
    //   ingredientName = ingredientName + 's';
    //   /** @todo manage also 'x' */
    // }
    return `${value.quantity || ''} ${value.unit} ${ingredientName}`;
  }

}
