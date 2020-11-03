import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http: HttpClient) { }


  getMovies(): Observable<any> {
    // return this.http.get('https://imdb-api.com/en/API/IMDbList/k_z5q9e595/ls004285275');
    // return this.http.get('https://imdb-api.com/en/API/MostPopularMovies/k_hbo5iks2');
    // return this.http.get('https://imdb-api.com/en/API/Top250Movies/k_hbo5iks2');
    return this.http.get('https://imdb-api.com/en/API/IMDbList/k_hbo5iks2/ls004285275');
  }
}
