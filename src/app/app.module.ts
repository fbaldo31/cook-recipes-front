import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { RecipeCreateModule } from './recipe-create/recipe-create.module';
import { RecipeModule } from './recipe/recipe.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    RecipeModule,
    RecipeCreateModule,
    SearchModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: environment.production ? '/recettes/' : '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
