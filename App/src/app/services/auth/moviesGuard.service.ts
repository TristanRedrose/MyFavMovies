import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})

export class MoviesRouteService implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

        return this.sessionService.isLoggedIn()
            ? true
            : this.router.createUrlTree(['/login']);
    }
}