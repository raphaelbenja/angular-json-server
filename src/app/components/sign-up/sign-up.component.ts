import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../models/user";
import * as bcrypt from "bcryptjs";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  newUser: User = {
    username: "",
    email: "",
    password: "",
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      password: [
        "",
        [Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.required],
      ],
    });
  }

  onSubmitForm() {
    const values = this.signUpForm.value;
    this.newUser.username = values.username;
    this.newUser.email = values.email;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(values.password, salt);
    this.newUser.password = hash;
    this.authService.saveUser(this.newUser).subscribe(
      () => this.router.navigate(["/auth/signin"]),
      (error) => console.log(error.message)
    );
  }
}
