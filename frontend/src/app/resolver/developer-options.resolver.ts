import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {DeveloperService} from '../service/developer.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperOptionsResolver implements Resolve<Observable<any>> {
  constructor(private developerService: DeveloperService) {
  }

  resolve() {
    return this.developerService.retrieveDeveloperOptions();
  }
}
