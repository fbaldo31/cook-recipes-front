import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private readonly api: ApiService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.api.getRecipes().subscribe(res => this.recipes = res)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

}
