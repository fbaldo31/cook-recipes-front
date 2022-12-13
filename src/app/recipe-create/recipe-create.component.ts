import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ITdDynamicElementConfig,
  TdDynamicElement,
  TdDynamicFormsComponent,
  TdDynamicType,
 } from '@covalent/dynamic-forms';
import { finalize } from 'rxjs';

import { ApiService } from '../services/api.service';
import { IngredientAutocompleteComponent } from '../shared/comonents/ingredient-autocomplete/ingredient-autocomplete.component';
import { UNITS } from '../shared/constants';
import { IngredientQuantity, IngredientsQuantityDto, Recipe, RecipeDto, Step } from '../shared/interfaces';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {
  @ViewChild('recipeForm', { static: true }) recipeForm!: TdDynamicFormsComponent;
  @ViewChild('ingredientForm', { static: true }) ingredientForm!: TdDynamicFormsComponent;
  @ViewChild('stepForm', { static: true }) stepForm!: TdDynamicFormsComponent;

  readonly formInputs: ITdDynamicElementConfig[] = [
    {
      name: 'title',
      label: 'Titre',
      type: TdDynamicElement.Input,
      required: true,
      flex: 50,
    },
    {
      name: 'difficulty',
      label: 'Difficulté',
      type: TdDynamicElement.Select,
      selections: ['Facile', 'Moyen', 'Difficile'],
      required: true,
      flex: 50,
    },
    {
      name: 'preparationTime',
      label: 'Temps de préparation',
      type: TdDynamicType.Number,
      min: 1,
      max: 2000,
      flex: 50,
    },
    {
      name: 'cookingTime',
      label: 'Temps de cuisson',
      type: TdDynamicType.Number,
      min: 0,
      max: 2000,
      flex: 50,
    },
    {
      name: 'portions',
      label: 'Nombre de parts',
      type: TdDynamicType.Number,
      min: 1,
      max: 100,
      flex: 50,
      default: 4,
    },
  ];
  ingredients : IngredientsQuantityDto[] = [];
  ingredientData: ITdDynamicElementConfig[] = [];
  ingredientToAdd = [
    {
      name: 'name',
      type: IngredientAutocompleteComponent,
      label: 'Nom de l \'ingrédient',
      flex: 33,
      validators: [
        {
          validator: (control: AbstractControl) => {
            const isValid: boolean = control.value?.length;
            return !isValid ? { required: true } : null;
          },
        },
      ],
      customConfig: {
        // This is a property unique to the custom component
        // and will be applied on instantiation of the component
        placeholder: 'Nom de l \'ingrédient',
      },
    },
    {
      name: 'quantity',
      label: 'Quantité',
      type: TdDynamicType.Number,
      required: true,
      flex: 33,
      validators: [
        {
          validator: (control: AbstractControl) => {
            const isValid: boolean = control.value > 0;
            return !isValid ? { positive: true } : null;
          },
        },
      ],
    },
    {
      name: 'unit',
      label: 'Unité',
      type: TdDynamicElement.Select,
      selections: Object.values(UNITS),
      required: true,
      flex: 33,
    },
  ];
  steps : Step[] = [];
  stepData: ITdDynamicElementConfig[] = [];
  stepToAdd = [
    {
      name: 'position',
      label: 'Ordre',
      type: TdDynamicType.Number,
      flex: 25,
    },
    {
      name: 'text',
      label: 'Description',
      type: TdDynamicElement.Textarea,
      required: true,
      flex: 75,
    },
  ];
  photos: any;
  recipe?: Recipe;
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.addIngredient();
    this.addStep();

    this.route.params.subscribe((res: Params) => {
      if (res['id']) {
        if (+res['id'] === 0) {
          // This is a Marmiton recipe
          this.setupForm(JSON.parse(res['recipe']));
        } else {
          // Edition mode
          this.api.getRecipe(res['id'])
            .pipe(finalize(() => this.loading = false))
            .subscribe((recipe: Recipe|Error) => {
              if (recipe instanceof Error) {
                console.error(recipe);
              } else {
                this.setupForm(recipe);
              }
            });
        }
      }
    })
  }

  /** Used for edition or for creation via marmiton */
  setupForm(recipe: Recipe) {
    this.recipe = recipe;
    this.recipe.steps.sort((a: Step, b: Step) => a.position - b.position);
    this.steps = [...this.recipe.steps];
    
    setTimeout(() => {
      this.recipeForm.controls['title'].setValue(recipe.title);
      this.recipeForm.controls['difficulty'].setValue(recipe.difficulty);
      this.recipeForm.controls['preparationTime'].setValue(recipe.preparationTime);
      this.recipeForm.controls['cookingTime'].setValue(recipe.cookingTime);
      this.ingredients = [
        ...recipe.ingredients.map((e: IngredientQuantity | IngredientsQuantityDto) => {
          if ((e as IngredientQuantity).ingredient) {
            return {
              id: (<IngredientQuantity>e).id,
              name: (<IngredientQuantity>e).ingredient.name,
              quantity: e.quantity,
              unit: (<IngredientQuantity>e).unit.label
            }
          } else {
            return {
              name: (<IngredientsQuantityDto>e).name,
              quantity: e.quantity,
              unit: (<IngredientsQuantityDto>e).unit
            }
          }
        })
      ];
    }, 200)
  }

  addIngredient(): void {
    this.ingredientData.push(...this.ingredientToAdd);
  }

  validateIngredient(): void {
    if (this.ingredientForm.valid) {
      if (this.ingredients.find(e => e.name === this.ingredientForm.value.name)) {
        console.error('Cet ingrédient a déjà été ajouté');
        return;
      }
      this.ingredients.push(this.ingredientForm.value);
      this.ingredientData = [];
      this.addIngredient();
    }
  }

  removeIngredient(ingredient: IngredientsQuantityDto & {id?: number}): void {
    if (ingredient.id) {
      this.api.removeIngredient(ingredient.id).subscribe();
    }
    this.ingredients.splice(this.ingredients.findIndex(e => e.name === ingredient.name), 1);
  }

  addStep(): void {
    this.stepData.push(...this.stepToAdd);
  }

  validateStep(): void {
    if (this.stepForm.valid) {
      if (this.steps.find(e => e.position === this.stepForm.value.position)) {
        console.error(`L'étape ${this.stepForm.value.position} a déjà été ajoutée.`);
        return;
      }
      this.steps.push(this.stepForm.value);
      this.steps.sort((a, b) => a.position - b.position);
      this.stepData = [];
      this.addStep();
    }
  }

  removeStep(step: Partial<Step>): void {
    if (step.id) {
      this.api.removeStep(step.id).subscribe();
    }
    this.steps.splice(this.steps.findIndex(e => e.position === step.position), 1);
  }

  isFormValid(): boolean {
    return this.recipeForm.valid && !!this.ingredients.length && !!this.steps.length;
  }

  fileSelect(files: any): void {
    if (files instanceof FileList) {
      this.photos = files
    } else {
      this.photos?.length ? this.photos.push(files) : this.photos = [files];
    }
  }

  removePhoto(name: string): void {
    this.photos.splice(this.photos.findIndex((e: File) => e.name === name), 1);
  }

  submit(): void {
    const recipe = {
      ...this.recipeForm.value,
      ingredients: this.ingredients,
      steps: this.steps,
    };
    this.api.postRecipe(recipe).subscribe(async res => {
      if (res instanceof Error) {
        console.error(res.message);
        return;
      }
      await this.router.navigate(['recipe', res.id]);
    });
  }

}
