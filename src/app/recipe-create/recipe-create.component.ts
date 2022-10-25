import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ITdDynamicElementConfig,
  TdDynamicElement,
  TdDynamicFormsComponent,
  TdDynamicType,
 } from '@covalent/dynamic-forms';
import { ApiService } from '../services/api.service';
import { UNITS } from '../shared/constants';

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
      min: 1,
      max: 2000,
      flex: 50,
    },
  ];
  ingredients : any[] = [];
  ingredientData: ITdDynamicElementConfig[] = [];
  ingredientToAdd = [
    {
      name: 'name',
      label: 'Nom de l \'ingrédient',
      type: TdDynamicElement.Input,
      required: true,
      flex: 33,
    },
    {
      name: 'quantity',
      label: 'Quantité',
      type: TdDynamicType.Number,
      required: true,
      flex: 33,
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
  steps : any[] = [];
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.addIngredient();
    this.addStep();
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

  removeIngredient(name: string): void {
    this.ingredients.splice(this.ingredients.findIndex(e => e.name === name), 1);
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

  removeStep(position: number): void {
    this.steps.splice(this.steps.findIndex(e => e.position === position), 1);
  }

  isFormValid(): boolean {
    return this.recipeForm.valid && !!this.ingredients.length && !!this.steps.length;
  }

  fileSelect(files: any) {
    console.log(files);
    if (files instanceof FileList) {
      this.photos = files
    } else {
      this.photos?.length ? this.photos.push(files) : this.photos = [files];
    }
  }

  removePhoto(name: string) {
    this.photos.splice(this.photos.findIndex((e: File) => e.name === name), 1);
  }

  submit(): void {
    const recipe = {
      ...this.recipeForm.value,
      ingredients: this.ingredients,
      steps: this.steps,
    };
    this.api.postRecipe(recipe).subscribe(res => console.log(res));
  }

}
