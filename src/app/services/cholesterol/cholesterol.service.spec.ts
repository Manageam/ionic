import { TestBed } from '@angular/core/testing';

import { CholesterolService } from './cholesterol.service';

describe('CholesterolService', () => {
  let service: CholesterolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CholesterolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
