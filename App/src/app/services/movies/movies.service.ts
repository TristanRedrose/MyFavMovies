import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieListResponse, Movie } from 'src/app/models/movie.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _baseUrl:string = "https://api.themoviedb.org/3/movie"
  private _apiKey: string = environment.API_KEY


  constructor(private http: HttpClient) { }

  getMoviesList(page: number): Observable<MovieListResponse> {
    let params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('page', page);
    return this.http.get<MovieListResponse>(`${ this._baseUrl }/top_rated`,{params: params});
  }

  getMovie(movieId: number): Observable<Movie> {
    let params = new HttpParams()
    .set('api_key', this._apiKey)
    return this.http.get<Movie>(`${ this._baseUrl }/${movieId}`,{params: params});
  }
}
 