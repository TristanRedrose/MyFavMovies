import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.types';
import { WishlistService } from 'src/app/services/movies/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  myWishlistCount: number;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
  }

  get wishlist(): Movie[] {
    return this.wishlistService.myWishlist
  }

  removeWish(movie: Movie): void {
    this.wishlistService.removeWish(movie).subscribe(res => {
      console.log(res.message);
      this.wishlistService.removeMovieWish(movie);
    });
  }
}
