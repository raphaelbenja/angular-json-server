import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./components/employee/employee.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "employees",
    //canActivate: [AuthGuardService],
    component: EmployeeComponent,
  },
  { path: "auth/signin", component: SignInComponent },
  { path: "auth/signup", component: SignUpComponent },
  { path: "", redirectTo: "employees", pathMatch: "full" },
  { path: "**", redirectTo: "employees", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
