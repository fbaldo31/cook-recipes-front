import { Component, OnDestroy, OnInit } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { Subscription } from 'rxjs';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipes: any = [];
  displayedColumns = ['title'];
  subscriptions: Subscription[] = [];
  constructor(private readonly api: ApiService, private dialog: TdDialogService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.api.getRecipes().subscribe(res => this.recipes = res)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  delete(recipe: any) {
    this.dialog.openConfirm({
      title: 'Supprimer cette recette: ' + recipe.title,
      message: 'Cette action est irréversible, voulez-vous continuer ?',
      cancelButton: 'Annuler',
      acceptButton: 'Supprimer',
      width: '500px',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.api.deleteRecipe(recipe.id).subscribe(() => {
          this.recipes.splice(this.recipes.findIndex((e: any) => e.id === recipe.id));
        });
      }
    });
  }

}
