import { TestBed } from '@angular/core/testing';
import { AssesmentsService } from './assesments.service';


describe('AssesmentsService', () => {
  let service: AssesmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssesmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
