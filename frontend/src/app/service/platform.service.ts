import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private http: HttpClient) { }

  retrievePlatformOptions() {
    return this.http.get <any[]>('/api/platform/options');
  }
}
