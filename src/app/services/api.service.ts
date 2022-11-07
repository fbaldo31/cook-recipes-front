import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IngredientQuantity, Recipe, Step } from '../shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl(): string {
    const url = new URL(environment.apiUrl);
    url.port = '3000';
    return url.toString();
  }

  getIngredientNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl()}ingredient/name`);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl()}recipe`);
  }

  getRecipe(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl()}recipe/${id}`);
  }

  getMarmitonUrls(title: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl()}recipe/marmiton/urls/${title}`);
  }

  getMarmitonRecipe(title: string, url: string): Observable<string[]> {
    let params = new HttpParams();
    params = params.append('title', title);
    params = params.append('url',url);
    return this.http.get<string[]>(`${this.apiUrl()}recipe/marmiton`, {params});
  }

  postRecipe(recipe: any, files?: any): Observable<Recipe> {
    let action = this.http.post<Recipe>(`${this.apiUrl()}recipe`, recipe);
    if (files) {
      return action.pipe<any>(map((res: any) => this.postPhotos(res.id, files)))
    }
    return action; 
  }

  postPhotos(recipeId: number, files: any): Observable<any> {
    const formData = new FormData();
    formData.append('photos', files)
    return this.http.post(`${this.apiUrl()}recipe/${recipeId}/photos`, formData);
  }

  deleteRecipe(recipeId: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.apiUrl()}recipe/${recipeId}`);
  }

  removeIngredient(id: number): Observable<IngredientQuantity> {
    return this.http.delete<IngredientQuantity>(`${this.apiUrl()}recipe/ingredient/${id}`);
  }

  removeStep(id: number): Observable<Step> {
    return this.http.delete<Step>(`${this.apiUrl()}recipe/step/${id}`);
  }

}
