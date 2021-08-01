import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';

export class AppGuard implements CanActivate {


  canActivate(): Observable<boolean> | boolean {

    return confirm('Do you really want to go to the dark side ?');
  }
}

