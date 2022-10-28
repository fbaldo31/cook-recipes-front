import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-ingredient-autocomplete',
  templateUrl: './ingredient-autocomplete.component.html',
  styleUrls: ['./ingredient-autocomplete.component.scss']
})
export class IngredientAutocompleteComponent implements OnInit {

  control!: FormControl;
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  selections: string[] = [];
  errorMessageTemplate!: TemplateRef<any>;
  private subscriptions: Subscription[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.filteredOptions = this.control?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.subscriptions.push(
      // this.api.getIngredientNames().subscribe(res => this.options = res),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option?.toLowerCase().includes(filterValue));
  }

}
