import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from '../services/login.servicxe';
import { FormsModule } from '@angular/forms';
import { employee } from '../model/db.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errMessage: string;
  public hasError: boolean = false;
  employee: employee;
  username: String = "";

  constructor(public router: Router, private actRoute: ActivatedRoute, public login: login) {
    this.username = actRoute.snapshot.params.username;
    //this.login = login;
  }

  ngOnInit(): void {
  }

  // post: update the login
  onFormSubmit = (personForm: NgForm) => {
    var role: Array<String> = [];
    let username: String = personForm.value.username;
    let password: String = personForm.value.password;
    role.push(username);
    role.push(password);
    console.log(role);
    this.login.showLoginPage(role)
      .subscribe(
        data => { // good practise
          if (data.status == 200) {
            console.log("status is 200 ok");
            // can navigate or proceed
            this.employee = data.body;
            if (this.employee.role.role == "EMPLOYEE" || this.employee.role.role == "ADMIN") {
              console.log("EMPLOYEE");
              this.login.add(this.employee);
              this.router.navigate(['/dashboad2/', this.employee.username]); //naviagte
            }
            if (this.employee.role.role == "HR" || this.employee.role.role == "ADMIN") {
              console.log("HR");
              this.router.navigate(['/dashboad1', this.employee.username]); //naviagte
            }
            if (this.employee.role.role == "HOD" || this.employee.role.role == "ADMIN") {
              console.log("HR");
              this.router.navigate(['/dashboad3', this.employee.username]); //naviagte
            }
          }
          this.hasError = false;
        },
        (error: string) => {
          this.hasError = true;
          this.errMessage = error;
        }
      )
  }
}