import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {

  private backgroundPattern = new Subject<boolean>();
  backgroundPattern$ = this.backgroundPattern.asObservable();

  hasBackgroundPattern(boolean) {
    this.backgroundPattern.next(boolean);
  }

}
