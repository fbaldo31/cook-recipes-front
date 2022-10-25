import { NgModule } from '@angular/core';

import { RecipeComponent } from './recipe.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    RecipeComponent,
    DetailsComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class RecipeModule { }
