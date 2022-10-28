import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAutocompleteComponent } from './ingredient-autocomplete.component';

describe('IngredientAutocompleteComponent', () => {
  let component: IngredientAutocompleteComponent;
  let fixture: ComponentFixture<IngredientAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
