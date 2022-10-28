import { NgModule } from '@angular/core';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentFileModule } from '@covalent/core/file';

import { SharedModule } from '../shared/shared.module';
import { RecipeCreateComponent } from './recipe-create.component';
import { IngredientAutocompleteComponent } from '../shared/comonents/ingredient-autocomplete/ingredient-autocomplete.component';

@NgModule({
  declarations: [
    RecipeCreateComponent
  ],
  imports: [
    SharedModule,
    CovalentDynamicFormsModule,
    CovalentFileModule,
  ],
  entryComponents: [IngredientAutocompleteComponent],
})
export class RecipeCreateModule { }
