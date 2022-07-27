import { Component, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  display: boolean = false;
  sideIsOpen: string = "closed";
  myWishlistCount: number;
  username: string;

  constructor(private router:Router, 
    private titleService: Title, 
    private activePage: ActivatedRoute, 
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.changeTitle();
    this.setUsername();
  }

  changeDisplay() {
    if (this.sideIsOpen === "closed") {
      this.display = true;
      this.sideIsOpen= "open";
    }
    else if (this.sideIsOpen === "open") {
      this.display = false;
      this.sideIsOpen= "closed";
    }
  }

  changeTitle() {
    this.router.events.subscribe(event => {
      switch(true) {
        case event instanceof NavigationEnd:
          this.titleService.setTitle(this.activePage.firstChild.snapshot.data['title']);
      }
    })
  }

  logOut():void {
    this.sessionService.logOut();
  }

  setUsername():void {
    this.username = this.sessionService.session.username;
  }
}
