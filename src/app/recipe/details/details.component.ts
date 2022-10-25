import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { finalize } from 'rxjs';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  recipe: any;
  loading = true;

  constructor(private readonly api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: Params) => {
      this.api.getRecipe(res['id'])
        .pipe(finalize(() => this.loading = false))
        .subscribe(recipe => this.recipe = recipe);
    })
  }

}
