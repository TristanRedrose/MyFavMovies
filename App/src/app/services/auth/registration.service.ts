import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Users } from "src/app/models/users.types";
import { ApiResponse } from "src/app/models/response.types";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {
    private _key: string = 'Token';
    private _token: string | null = null;
    private _expiry: number;

    constructor(private http: HttpClient) {
    }

    registerUser(user: Users): Observable <void>{
        return this.http.post<ApiResponse>("http://localhost:3000/api/auth/register", user).pipe(map((res: ApiResponse) => {
            this._token = res.token;
            this._expiry = res.exp;
            localStorage.setItem(this._key, this._token);
            localStorage.setItem('expiry', this._expiry.toString());
        }));
    }
}