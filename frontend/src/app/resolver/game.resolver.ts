import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {GameService} from '../service/game.service';

@Injectable({
  providedIn: 'root'
})
export class GameResolver implements Resolve<Observable<any>> {
  constructor(private gameService: GameService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.gameService.getGame(route.paramMap.get('id'));
  }
}
