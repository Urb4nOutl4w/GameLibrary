import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {DeveloperService} from '../service/developer.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperResolver implements Resolve<Observable<any>> {
  constructor(private developerService: DeveloperService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.developerService.getDeveloper(route.paramMap.get('id'));
  }
}
