import {Router} from '@angular/router';
import {AppGuard} from './app.guard';
import {async, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';


describe('App Guard', () => {
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let appGuard: AppGuard;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [AppGuard,
        {provide: Router, useValue: router}
      ]
    })
    .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    appGuard = TestBed.get(AppGuard);
  });

  it('be able to hit route when is confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    expect(appGuard.canActivate()).toBe(true);
  });

  it('not be able to hit route when decline', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    expect(appGuard.canActivate()).toBe(false);
  });
});
