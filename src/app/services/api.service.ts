import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { WINDOW } from '../shared/providers/window.provider';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject(WINDOW) private window: Window) { }

  private apiUrl(): string {
    return this.window.location.hostname + ':3000';
  }

  getIngredientNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ingredient/name`);
  }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipe`);
  }

  getRecipe(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipe/${id}`);
  }

  postRecipe(recipe: any, files?: any): Observable<any> {
    let action = this.http.post(`${this.apiUrl}/recipe`, recipe);
    if (files) {
      return action.pipe(map((res: any) => this.postPhotos(res.id, files)))
    }
    return action; 
  }

  postPhotos(recipeId: number, files: any): Observable<any> {
    const formData = new FormData();
    formData.append('photos', files)
    return this.http.post(`${this.apiUrl}/recipe/${recipeId}/photos`, formData);
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recipe/${recipeId}`);
  }
}
