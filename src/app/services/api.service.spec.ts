import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpClient);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
