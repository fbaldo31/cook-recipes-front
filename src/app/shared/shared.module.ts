import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
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
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from '../app-routing.module';
import { IngredientAutocompleteComponent } from './comonents/ingredient-autocomplete/ingredient-autocomplete.component';
import { MarmitonTitlePipe } from './pipes/marmiton-title.pipe';

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
  MatExpansionModule,
];

const COMPONENTS: any[] = [
  IngredientAutocompleteComponent,
];

const PIPES = [
  MarmitonTitlePipe,
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  entryComponents: [...COMPONENTS],
})
export class SharedModule { }
