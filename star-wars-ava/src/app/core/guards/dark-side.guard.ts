import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';

export class DarkSideGuard implements CanDeactivate<boolean> {


  canDeactivate(): boolean {
    alert('No way from dark side');
    return false;
  }
}

