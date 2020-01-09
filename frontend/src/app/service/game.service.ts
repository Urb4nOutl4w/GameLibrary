import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get('/api/game/list');
  }

  getGame(id) {
    return this.http.get('/api/game/' + id + '/get');
  }

  createGame(game) {
    return this.http.post('api/game/create', game);
  }

  deleteGame(game) {
    return this.http.delete('/api/game/' + game.id + '/delete');
  }

  updateGame(game) {
    return this.http.put('api/game/' + game.id + '/update', game);
  }
}
