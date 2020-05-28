import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/app/models/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<Boolean>;
  userAuth: Observable<User>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userAuth = this.authService.userAuth;
  }

  logout() {
    this.authService.logout();
  }

  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          this.spinner.show();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
            this.spinner.hide();
          }, 1600);

          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
