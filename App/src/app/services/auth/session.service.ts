import { Injectable } from "@angular/core";
import { Users } from "src/app/models/users.types";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "src/app/models/response.types";
import { map,Observable } from "rxjs";
import { Router } from "@angular/router";
import { Session } from "src/app/models/session.types";

@Injectable ({
    providedIn: 'root'
})

export class SessionService {

    private _session: Session = {
        token: null,
        username: null,
        validTo: null,
    }

    // Typescript issue with NodeJS.Timeout type
    private _sessionTimer: any;
    
    constructor( private http: HttpClient, private router: Router) {}

    setSession(session:Session): void {
        this._session = session;
        localStorage.setItem('currentSession', JSON.stringify(session));
        this.setSessionTimer();
    }
    
    logIn(user: Users): Observable <void>  {
        return this.http.post<LoginResponse>("http://localhost:3000/api/auth/login", user).pipe(map((res: LoginResponse) => {
            const session = {
                token: res.token,
                username: user.username,
                validTo: res.exp,
            }
            this.setSession(session);
        }));
    };

    clearSession() {
        this._session = {
            token: null,
            username: null,
            validTo: null,
        }
    }

    logOut(): void {
        this.clearSession();
        localStorage.clear();
        clearTimeout(this._sessionTimer);
        console.log("logged out");
        this.router.navigate(["/login"]);
    };

    isLoggedIn(): boolean {
        return !!this._session.username;
    };

    setSessionTimer(): void {
        clearTimeout(this._sessionTimer);
        this._sessionTimer = setTimeout(() => this.logOut(), (this._session.validTo - (Math.floor(Date.now() / 1000))) * 1000);
    }
    
    get session() {
        return this._session;
    }
}