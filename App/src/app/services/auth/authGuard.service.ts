import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { SessionService } from "./session.service";
import { Session } from "src/app/models/session.types";

@Injectable({
    providedIn: 'root'
})

export class AuthRouteService implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.sessionService.isLoggedIn) 
            return true;

        const sessionString = localStorage.getItem("session");
        if (sessionString) {
            const session: Session = JSON.parse(sessionString);
            if (Math.floor(Date.now() / 1000) < (session.validTo)) {
                this.sessionService.setSession(session);
                return true
            }
        }

        return this.router.createUrlTree(['/login']);
    }
}