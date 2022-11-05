import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { DetailsComponent } from './recipe/details/details.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  { path: '', component: RecipeComponent },
  { path: 'recipe/:id', component: DetailsComponent },
  { path: 'create/:id', component: RecipeCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
