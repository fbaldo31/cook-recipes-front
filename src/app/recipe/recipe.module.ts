import { NgModule } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';

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
  ],
  providers: [TdDialogService]
})
export class RecipeModule { }
