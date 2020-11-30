import { Component, OnInit } from '@angular/core';
import { employee, stat, event } from '../model/db.model';
import { login } from '../services/login.servicxe';
import { participent } from '../services/participent.service';
import { Router, ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-participent',
  templateUrl: './participent.component.html',
  styleUrls: ['./participent.component.css']
})
export class ParticipentComponent implements OnInit {

  employeeArr: employee[] = [];
  employee1: employee;
  stat: stat;
  event: event[];
  public errMessage: string;
  public hasError: boolean = false;
  public id: string;

  constructor(public login: login, public participent: participent, public router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('username');
    // get details of employee provide user-name
    this.participent.showEmployeePage(this.id)
      .subscribe(resp => {
        console.log(resp);
        console.log(resp.status);
        console.log(resp.statusText);
        console.log(resp.url);
        this.employee1 = resp.body;
      });
  }

  ngOnInit(): void {
    console.log(this.id);
    // show all event in which employee has enroll for event
    this.participent.postStats(this.id)
      .subscribe(resp => {
        console.log(resp);
        console.log(resp.status);
        console.log(resp.statusText);
        console.log(resp.url);
        this.stat = resp.body;
      });

    var role: Array<String> = [];
    role.push(this.id);
    role.push("false");
    role.push("0");
    console.log(role);

    // post all api where employee can enroll for selected events
    this.participent.postEvent(role)
      .subscribe(
        data => { // good practise
          if (data.status == 200) {
            console.log("status is 200 ok");
            // can navigate or proceed
            this.event = data.body;
            console.log(this.event)
          }
          this.hasError = false;
        },
        (error: string) => {
          this.hasError = true;
          this.errMessage = error;
        }
      )

  }

  // when we click enroll button
  onFormSubmit1 = (eventID) => {
    var role: Array<String> = [];
    role.push(this.id);
    role.push("true");
    role.push(eventID);
    console.log(role);
    
    // post all api where employee can enroll for selected events
    this.participent.postEvent(role)
      .subscribe(
        data => { // good practise
          if (data.status == 200) {
            console.log("status is 200 ok");
            // can navigate or proceed
            this.event = data.body;
            console.log(this.event)
            this.router.navigate(['/dashboad2/' + this.id]);
          }
          this.hasError = false;
        },
        (error: string) => {
          this.hasError = true;
          this.errMessage = error;
        }
      )
      this.router.navigate(['/dashboad2/' + this.id]);
  }
}


