import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from '../app-routing.module';
import { IngredientAutocompleteComponent } from './comonents/ingredient-autocomplete/ingredient-autocomplete.component';
import { WINDOW_PROVIDERS } from './providers/window.provider';

const MODULES = [
  CommonModule,
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
];

const COMPONENTS: any[] = [
  IngredientAutocompleteComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ],
  providers: [WINDOW_PROVIDERS],
  entryComponents: [...COMPONENTS],
})
export class SharedModule { }
