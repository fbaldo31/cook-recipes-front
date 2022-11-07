import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  searchInputTerm = '';
  urls: string[] = [];
  recipe: any;
  subscriptions: Subscription[] = [];

  constructor(private api: ApiService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  search($event: any): void {
    this.searchInputTerm = $event;
    this.subscriptions.push(
      this.api.getMarmitonUrls(this.searchInputTerm).subscribe((res: string[]) => this.urls = res)
    );
  }
 
  clear(): void {
    this.searchInputTerm = '';
  }

  getRecipe(url: string): void {
    this.subscriptions.push(
      this.api.getMarmitonRecipe(this.searchInputTerm, url).subscribe(res => this.recipe = res)
    );
  }

}
