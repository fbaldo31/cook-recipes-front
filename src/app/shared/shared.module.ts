import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from '../app-routing.module';

const MODULES = [
  CommonModule,
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatListModule,
  MatIconModule,
];

const COMPONENTS: any[] = [];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ]
})
export class SharedModule { }
