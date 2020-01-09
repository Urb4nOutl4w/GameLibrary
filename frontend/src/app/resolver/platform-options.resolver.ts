import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {PlatformService} from '../service/platform.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformOptionsResolver implements Resolve<Observable<any>> {
  constructor(private platformService: PlatformService) {
  }

  resolve() {
    return this.platformService.retrievePlatformOptions();
  }
}
