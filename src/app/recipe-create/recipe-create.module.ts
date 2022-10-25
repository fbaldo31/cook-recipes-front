import { NgModule } from '@angular/core';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentFileModule } from '@covalent/core/file';

import { SharedModule } from '../shared/shared.module';
import { RecipeCreateComponent } from './recipe-create.component';

@NgModule({
  declarations: [
    RecipeCreateComponent
  ],
  imports: [
    SharedModule,
    CovalentDynamicFormsModule,
    CovalentFileModule,
  ]
})
export class RecipeCreateModule { }
