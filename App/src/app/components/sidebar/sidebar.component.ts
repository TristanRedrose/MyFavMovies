import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/movies/wishlist.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() display: boolean;
  @Output() sideCloseEvent = new EventEmitter();

  constructor(private router:Router, private wishlistService: WishlistService) { }

  ngOnInit(): void {
  }

  changeSidebar() {
    if (this.display === true) {
      this.sideCloseEvent.emit();
    }
  }

  get wishlist() {
    return this.wishlistService.myWishlist;
  }

  hasRoute(route: string): boolean {
    return this.router.isActive( route, {
    paths: 'exact', 
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
    });
  }
}
