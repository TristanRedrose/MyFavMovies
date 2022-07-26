import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/404_page/page_not_found';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { HomeComponent } from './components/home/home';
import { LayoutComponent } from './components/layout/layout.component';
import { MovieListComponent } from './components/movies/movie-list.component';
import { MovieComponent } from './components/movies/movie.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MoviesRouteService } from './services/auth/moviesGuard.service';
import { AuthRouteService } from './services/auth/authGuard.service';

const appRoutes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [MoviesRouteService], 
    children: [
      { path: 'movies/:movie_id', component: MovieComponent},
      { path: 'movies', component: MovieListComponent, data: { title: "MyFavMovies - Movies List" } },
      { path: 'wishlist', component: WishlistComponent, data: { title:"MyFavMovies - Wishlist" } },
      { path: '', component: HomeComponent, data: { title: "MyFavMovies"}},
    ]
  },
  { path: 'login', component: LoginComponent, data: { title: "MyFavMovies-Login"}, canActivate: [AuthRouteService] },
  { path: 'register', component: RegisterComponent, data: { title: "MyFavMovies-Register"}, canActivate: [AuthRouteService] },
  { path: '**', component: PageNotFoundComponent, data: { title: "PageNotFound"} },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
