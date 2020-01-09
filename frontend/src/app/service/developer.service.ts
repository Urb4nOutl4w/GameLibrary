import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient) { }

  retrieveDeveloperOptions() {
    return this.http.get <any[]>('/api/developer/options');
  }

  getDevelopers() {
    return this.http.get('/api/developer/list');
  }

  getDeveloper(id) {
    return this.http.get('/api/developer/' + id + '/get');
  }

  createDeveloper(developer) {
    return this.http.post('api/developer/create', developer);
  }

  deleteDeveloper(developer) {
    return this.http.delete('/api/developer/' + developer.id + '/delete');
  }

  updateDeveloper(developer) {
    return this.http.put('api/developer/' + developer.id + '/update', developer);
  }
}
