import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { RecipeCreateModule } from './recipe-create/recipe-create.module';
import { RecipeModule } from './recipe/recipe.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    RecipeModule,
    RecipeCreateModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: environment.production ? '/recettes' : ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
