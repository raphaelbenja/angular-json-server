import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../models/employee";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getAllEmployee() {
    return this.httpClient.get("http://localhost:3000/employees");
  }

  getOneEmployee(employee: Employee) {
    return this.httpClient.get(
      "http://localhost:3000/employees/" + employee.id
    );
  }

  saveEmployee(employee: Employee) {
    return this.httpClient.post("http://localhost:3000/employees", employee);
  }

  editEmployee(employee: Employee) {
    return this.httpClient.put(
      "http://localhost:3000/employees/" + employee.id,
      employee
    );
  }

  deleteEmployee(employee: Employee) {
    return this.httpClient.delete(
      "http://localhost:3000/employees/" + employee.id
    );
  }
}
