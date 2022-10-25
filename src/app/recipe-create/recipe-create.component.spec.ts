import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { ApiService } from '../services/api.service';
import { RecipeCreateComponent } from './recipe-create.component';

describe('RecipeCreateComponent', () => {
  let component: RecipeCreateComponent;
  let fixture: ComponentFixture<RecipeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RecipeCreateComponent ],
      providers: [ApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
