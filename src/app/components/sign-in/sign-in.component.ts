import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import * as bcrypt from "bcryptjs";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  newUser: User = {
    username: "",
    email: "",
    password: "",
  };
  users: User[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.authService.getAllUser().subscribe((data) => (this.users = data));
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: [
        "",
        [Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.required],
      ],
    });
  }

  onSubmitForm() {
    const values = this.signInForm.value;
    this.newUser.username = values.username;
    this.newUser.password = values.password;
    const user = this.users.find((employee) =>
      employee.username.includes(this.newUser.username)
    );

    if (user != undefined) {
      const test = bcrypt.compareSync(this.newUser.password, user.password);
      if (test) {
        this.authService.login(this.newUser);
      } else {
        confirm("Password doesn't match");
      }
    } else {
      confirm("User doesn't exist, please register another account");
    }
  }
}
