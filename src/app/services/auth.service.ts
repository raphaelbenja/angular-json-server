import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import * as bcrypt from "bcryptjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  userAuth = new BehaviorSubject<User>({
    username: "",
    email: "",
    password: "",
  });
  constructor(private httpClient: HttpClient, private router: Router) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  login(user: User) {
    if (user.username !== "" && user.password !== "") {
      // {3}
      let salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
      this.loggedIn.next(true);
      this.userAuth.next(user);
      this.router.navigate(["/employees"]);
    }
  }

  getOneUser(user: User) {
    return this.httpClient.get<User>("http://localhost:3000/users/" + user);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(["/auth/signin"]);
  }

  saveUser(user: User) {
    return this.httpClient.post("http://localhost:3000/users", user);
  }

  getAllUser() {
    return this.httpClient.get<User[]>("http://localhost:3000/users");
  }
}
