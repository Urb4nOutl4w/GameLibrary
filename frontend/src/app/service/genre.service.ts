import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor() { }

  genreNames = {a: 'Action', j: 'Jump n Run', r: 'RPG'};

}
