import { NgModule } from '@angular/core';
import { CovalentSearchModule } from '@covalent/core/search';

import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { MarmitonTitlePipe } from '../shared/pipes/marmiton-title.pipe';


@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    SharedModule,
    CovalentSearchModule,
  ],
})
export class SearchModule { }
