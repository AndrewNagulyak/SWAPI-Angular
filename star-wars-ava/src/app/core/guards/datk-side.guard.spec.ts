
import { TestBed } from '@angular/core/testing';

import { CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {DarkSideGuard} from './dark-side.guard';
import {DarkSideComponent} from '../../pages/dark-side/dark-side/dark-side.component';


class MockComponent implements CanDeactivate<any> {
  // Set this to the value you want to mock being returned from GuardedComponent
  returnValue: boolean | Observable<boolean>;

  canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}
describe('CanDeactivateGuardService', () => {
  let mockComponent: MockComponent;
  let service: DarkSideGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DarkSideGuard,
        MockComponent
      ]
    });
    service = TestBed.get(DarkSideGuard);
    mockComponent = TestBed.get(MockComponent);
  });

  it('expect service to instantiate', () => {
    expect(service).toBeTruthy();
  });

  it('cannot route', () => {
    expect(service.canDeactivate()).toBeFalse();
  });
});
