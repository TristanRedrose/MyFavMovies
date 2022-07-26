import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: "app-page_not_found",
    templateUrl: "./page_not_found.html",
    styleUrls: ["./page_not_found.css"]
})

export class PageNotFoundComponent implements OnInit {
    constructor(private _location: Location) {}
  
    ngOnInit(): void {}

    linkClick(): void {
        this._location.back();
    }
  }