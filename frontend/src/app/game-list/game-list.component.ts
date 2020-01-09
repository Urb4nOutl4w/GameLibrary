import { Component, OnInit } from '@angular/core';
import {GameService} from '../service/game.service';
import {GenreService} from '../service/genre.service';
import {UserService} from '../service/user.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games: any[];
  displayedColumns = ['title', 'genre', 'platform_name', 'id'];

  constructor(private gameService: GameService, public genreService: GenreService, private userService: UserService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.gameService.getGames().subscribe((response: any[]) => {
      this.games = response;
    });
  }

  deleteGame(game: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.gameService.deleteGame(game).subscribe( () => {
          this.ngOnInit();
        });
      }
    });
  }
}
