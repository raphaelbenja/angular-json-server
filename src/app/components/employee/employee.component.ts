import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/models/employee";
import { EmployeeService } from "src/app/services/employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit {
  config: any;
  employees: Employee[];
  resultEmployees: Employee[] = [];
  showForm = false;
  editForm = false;
  newEmployee: Employee = {
    name: "",
    email: "",
    title: "",
    avatar: "",
    skills: "",
  };
  search = "";
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onGetEmployees();
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.resultEmployees.length,
    };
  }

  onSearchEmployee() {
    this.resultEmployees = this.employees.filter((employee) =>
      employee.title.includes(this.search)
    );
  }

  onGetEmployees() {
    this.employeeService
      .getAllEmployee()
      .subscribe((data: []) => (this.resultEmployees = this.employees = data));
  }

  onAddEmployee() {
    this.employeeService.saveEmployee(this.newEmployee).subscribe(
      () => (this.onGetEmployees(), this.resetForm()),
      (error) => console.log(error.message)
    );
  }

  resetForm() {
    this.newEmployee = {
      avatar: "",
      email: "",
      skills: "",
      name: "",
      title: "",
    };
  }

  onShowForm() {
    this.resetForm();
    this.editForm = false;
    if (!this.showForm) {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }

  onChangePage(event) {
    this.config.currentPage = event;
  }

  onDeleteEmployee(employee: Employee) {
    this.employeeService
      .deleteEmployee(employee)
      .subscribe(() => this.onGetEmployees());
  }

  onEdit(employee: Employee) {
    this.editForm = true;
    this.showForm = true;
    this.newEmployee = employee;
  }

  onEditEmployee(employee: Employee) {
    this.employeeService.editEmployee(employee).subscribe((data) => {
      [data, ...this.employees];
      confirm("User has been updated successfully");
    });
  }
}
