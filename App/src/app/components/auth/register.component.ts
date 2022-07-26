import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Users } from "src/app/models/users.types";
import { RegistrationService } from "src/app/services/auth/registration.service";

@Component ({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./authForms.component.css"],
})

export class RegisterComponent implements OnInit {

    registrationForm: FormGroup;
    passwordMatch: boolean = true;
    errorMessage: null | string = null;
    user: Users;

    constructor(private router:Router, 
        private registrationService: RegistrationService) {}

    ngOnInit(): void {
        this.registrationForm = new FormGroup({
            passwordsInput: new FormGroup ({
                password: new FormControl(null, Validators.required),
                confirm: new FormControl(null, Validators.required),
            }),
            username: new FormControl(null, Validators.required),
        });
    }

    goToLogin(): void {
        this.router.navigate(["/login"]);
    }

    onSubmit(): void {
        console.log(this.registrationForm)
        this.registrationForm.markAllAsTouched();
        if (this.registrationForm.get('passwordsInput.password').errors !== null 
            || this.registrationForm.get('username').errors !== null) {
                return;
        }

        if (this.registrationForm.value.passwordsInput.password !==
            this.registrationForm.value.passwordsInput.confirm) {
                this.passwordMatch = false;
                let subscription = this.registrationForm.get('passwordsInput').valueChanges.subscribe(() => {
                    this.passwordMatch = true;
                    subscription.unsubscribe;
                });
                return;
        }
        
        this.user = {
            username: this.registrationForm.value.username,
            password: this.registrationForm.value.passwordsInput.password,
        }
        this.registrationService.registerUser(this.user).subscribe(() => {
            this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
            this.errorMessage = err.error.message;
            let subscription = this.registrationForm.get('username').valueChanges.subscribe(() => {
                this.errorMessage = null;
                subscription.unsubscribe;
            })
        });
    }
}