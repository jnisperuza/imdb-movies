import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MovieListService } from './movie-list.service';

export interface Movie {
  description: string;
  fullTitle: string;
  id: string;
  imDbRating: string;
  imDbRatingCount: number;
  image: string;
  index: number;
  title: string;
  year: number;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: Movie[] = [];
  originalData: Movie[] = [];
  searchControl = new FormControl();

  constructor(private movieListService: MovieListService) { }

  ngOnInit(): void {
    const storedMovieList = this.getStoredList();
    if (storedMovieList?.length) {
      this.movieList = storedMovieList;
      this.originalData = storedMovieList;
    } else {
      this.getMovies();
    }
    this.searchControl.valueChanges.subscribe(value => {
      if (value) {
        this.movieList = this.originalData.filter(movie => movie?.fullTitle?.toLowerCase()?.includes(value));
      } else {
        this.movieList = this.originalData;
      }
    });
  }

  private getMovies(): void {
    this.movieListService.getMovies().subscribe(response => {
      this.movieList = response.items;
      this.originalData = response.items;
      localStorage.setItem('movieList', JSON.stringify(response.items));
    });
  }

  private getStoredList(): Movie[] {
    try {
      return JSON.parse(localStorage.getItem('movieList'));
    } catch (error) {
      return [];
    }
  }

}
