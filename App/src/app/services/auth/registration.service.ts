import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Users } from "src/app/models/users.types";
import { LoginResponse } from "src/app/models/response.types";
import { map, Observable } from "rxjs";
import { SessionService } from "./session.service";
import { Session } from "src/app/models/session.types";

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {
    private _key: string = 'Token';
    private _token: string | null = null;
    private _expiry: number;

    constructor(private http: HttpClient, private sessionService: SessionService) {
    }

    registerUser(user: Users): Observable <void>{
        return this.http.post<LoginResponse>("http://localhost:3000/api/auth/register", user).pipe(map((res: LoginResponse) => {
            const session: Session = {
                token: res.token,
                username: user.username,
                validTo: res.exp,
            }
            this.sessionService.setSession(session);
        }));
    }
}