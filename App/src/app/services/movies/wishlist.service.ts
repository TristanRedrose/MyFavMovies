import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiResponse, WishlistResponse } from "src/app/models/response.types";
import { Observable } from "rxjs";
import { Movie } from "src/app/models/movie.types";
import { MoviesService } from 'src/app/services/movies/movies.service';

@Injectable ({
 providedIn: 'root'
})

export class WishlistService {

    private _key: string = 'Token';
    private _token: string | null
    private _myWishlist: Movie[];

    constructor(private http: HttpClient, private moviesService: MoviesService) {
    }

    addWish(movie: Movie): Observable <ApiResponse> {
      this._token = localStorage.getItem(this._key);
      const header = new  HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      });
      const newMovie = {
        movie_id: movie.id
      }

      return this.http.post<ApiResponse>('http://localhost:3000/api/wishlist/addWish', newMovie, {headers: header});
    };

    removeWish(movie: Movie ){
      this._token = localStorage.getItem(this._key);
      const header = new  HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      });
      const delMovie = {
        movie_id: movie.id
      }

      return this.http.post<ApiResponse>('http://localhost:3000/api/wishlist/removeWish', delMovie, {headers: header});
    };

    returnWishlist(): Observable <WishlistResponse[]> {
      this._token = localStorage.getItem(this._key);
      const header = new  HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      });

      return this.http.get<WishlistResponse[]>('http://localhost:3000/api/wishlist/getWishlist', {headers: header});
    };

    initWishlist(): void {
      console.log("initialising wishlist");
      this._myWishlist = [];
      let wishlist: WishlistResponse[] = [];
      this.returnWishlist().subscribe(res => {
        if (res === null) {
          return;
        }
        wishlist = res;
        for (let i = 0; i < wishlist.length; i++) {
          this.moviesService.getMovie(wishlist[i].movie_id).subscribe(res => {
            this._myWishlist.push(res);
          });
        }
      });
    }

    get myWishlist(): Movie[] {
      return this._myWishlist;
    }

    addMovieWish(movie: Movie): void {
        movie.isWishlisted = true;
        this._myWishlist.push(movie)
    }

    removeMovieWish(movie: Movie): void {
      movie.isWishlisted = false;
      this._myWishlist = this._myWishlist.filter(item => item.id !== movie.id);
    }

    isWishlisted(movie_id: number): boolean {
      console.log(this._myWishlist.length)
      return this.myWishlist.length 
        ? this._myWishlist.find(movie => movie.id === movie_id) !== undefined
        : false;
    }
}