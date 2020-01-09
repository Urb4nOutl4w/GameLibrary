import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../service/game.service';
import {GenreService} from '../service/genre.service';
import {DeveloperService} from '../service/developer.service';
import {PlatformService} from '../service/platform.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  gameFormGroup;
  developerOptions;
  platformOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private gameService: GameService, public genreService: GenreService) { }

  ngOnInit() {
    this.gameFormGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required, this.badWordValidator()]],
      price: [50],
      genre: [null],
      release_date: [null, Validators.required],
      developer: [null],
      platform: [[]],

    });

    const id = this.route.snapshot.paramMap.get('id');

    const data = this.route.snapshot.data;
    this.developerOptions = data.developerOptions;
    this.platformOptions = data.platformOptions;

    if (data.game) {
      this.gameFormGroup.patchValue(data.game);
    }

  }

  createGame() {
    const game = this.gameFormGroup.value;
    if (game.id) {
      this.gameService.updateGame(game).subscribe(() => {
        alert('updated succesfully');
      });
    } else {
      this.gameService.createGame(game).subscribe((response: any) => {
        this.router.navigate(['/game-form/' + response.id]);
      });
    }
  }

  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = /(bad word|asdf|[0-9]3)/.test(control.value);
      return forbidden ? {badWord: {value: control.value}} : null;
    };
  }

}
