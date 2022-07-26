import { Injectable } from "@angular/core";
import { Users } from "src/app/models/users.types";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "src/app/models/response.types";
import { map,Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable ({
    providedIn: 'root'
})

export class SessionService {

    private _token: string | null = null;
    private _key: string = 'Token';
    private _expiry: number;
    
    constructor( private http: HttpClient, private router: Router) {}

    logIn(user: Users): Observable <void>  {
        return this.http.post<ApiResponse>("http://localhost:3000/api/auth/login", user).pipe(map((res: ApiResponse) => {
            this._token = res.token;
            this._expiry = res.exp;
            localStorage.setItem(this._key, this._token);
            localStorage.setItem("username", user.username);
            localStorage.setItem("expiry", this._expiry.toString());
        }));
    };

    logOut(): void {
        localStorage.clear();
        console.log("logged out");
        this.router.navigate(["/login"]);
    };

    isLoggedIn(): boolean {
        return !!localStorage.getItem("username");
    };

    sessionTimer(): void {
        this.initExpiry();
        setTimeout(() => {this.logOut()}, (this._expiry - (Math.floor(Date.now() / 1000))) * 1000);
        console.log((this._expiry - (Math.floor(Date.now() / 1000))) * 1000)
    }

    initExpiry(): void {
        if (!this._expiry) {
            this._expiry = parseInt(localStorage.getItem("expiry"));
        }
    }

    isTokenExpired(): boolean {
        if (localStorage.getItem("expiry")) {
            let expiry: number = parseInt(localStorage.getItem("expiry"));
            if (Math.floor(Date.now() / 1000) < expiry) {
                console.log("token valid")
                return false;
            }
        }
        console.log("token expired");
        return true;
    }
}