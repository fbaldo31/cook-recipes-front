import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { finalize } from 'rxjs';

import { IngredientQuantity, IngredientsQuantityDto, Recipe, Step } from '../../shared/interfaces';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  recipe: any;
  loading = true;

  constructor(private readonly api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: Params) => {
      this.api.getRecipe(res['id'])
        .pipe(finalize(() => this.loading = false))
        .subscribe((recipe: Recipe) => {
          this.recipe = recipe;
          this.recipe.steps.sort((a: Step, b: Step) => a.position - b.position);
        });
    });
  }

  formatIngredient(i: IngredientQuantity): IngredientsQuantityDto {
    return {
      name: i.ingredient.name,
      quantity: i.quantity,
      unit: i.unit?.label,
    }
  }

}
