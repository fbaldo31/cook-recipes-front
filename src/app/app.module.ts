import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeCreateModule } from './recipe-create/recipe-create.module';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeModule } from './recipe/recipe.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    RecipeModule,
    RecipeCreateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
