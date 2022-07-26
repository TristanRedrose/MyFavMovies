import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie.types';
import { WishlistService } from 'src/app/services/movies/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'MyFavMovies';
  @Output() sidebarEvent= new EventEmitter();
  
  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistService.initWishlist();
  }

  toggleSidebar() {
    this.sidebarEvent.emit();
  }

  get wishlist(): Movie[] {
    return this.wishlistService.myWishlist;
  }

}
