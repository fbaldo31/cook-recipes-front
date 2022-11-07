import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { DetailsComponent } from './recipe/details/details.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: RecipeComponent },
  { path: 'recipe/:id', component: DetailsComponent },
  { path: 'create', component: RecipeCreateComponent },
  { path: 'create/:id', component: RecipeCreateComponent },
  { path: 'create/:id/:recipe', component: RecipeCreateComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
