import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ButtonComponent } from './components/button/button.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/404_page/page_not_found';
import { HomeComponent } from './components/home/home';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './components/movies/movie-list.component';
import { MovieComponent } from './components/movies/movie.component';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { MoviesRouteService } from './services/auth/moviesGuard.service';
import { AuthRouteService } from './services/auth/authGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ButtonComponent,
    LayoutComponent,
    MovieListComponent,
    MovieComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,
    WishlistComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ProgressSpinnerModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MoviesRouteService, AuthRouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
