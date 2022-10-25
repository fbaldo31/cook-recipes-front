import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
    return this.http.post(`${this.apiUrl}/${recipeId}/photos`, formData);
  }
}
