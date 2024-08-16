import { TestBed } from '@angular/core/testing';
import { guideService } from './guide.service';


describe('GuideService', () => {
  let service: guideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(guideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
