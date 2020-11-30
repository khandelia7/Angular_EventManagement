import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { post, event } from '../model/db.model';
import { eventmanager } from '../services/eventmanager.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  public errMessage: string;
  public hasError: boolean = false;
  username: String = "";
  post: post[] = [];
  eventFinal: event;
  postselected: post[] = [];
  postselectedFinal: post[] = [];
  flag: Boolean = false;
  department: String = " ";

  constructor(public router: Router, private actRoute: ActivatedRoute, public eventmanager: eventmanager) {
    this.username = actRoute.snapshot.params.username;
  }

  ngOnInit(): void {
    this.eventmanager.showAllDepartment()
      .subscribe(
        data => { // good practise
          if (data.status == 200) {
            console.log("status is 200 ok");
            // can navigate or proceed
            this.post = data.body;
            console.log(this.post)
          }
          this.hasError = false;
        },
        (error: string) => {
          this.hasError = true;
          this.errMessage = error;
        }
      )

  }

  onFormSubmit(personForm: NgForm) {
    console.log(this.department)
    this.eventFinal.post.department = this.department;
    this.eventFinal.post.designation = personForm.value.designation;
    this.eventFinal.event_name = personForm.value.EventName;
    this.eventFinal.skillSet = personForm.value.SkillSet;
    this.eventFinal.countOfPanel = personForm.value.countOfPanel;
    this.eventFinal.eventDate = personForm.value.eventDate;
    this.eventFinal.escalationTime = personForm.value.escalationTime;
    this.eventFinal.status = personForm.value.status;
    for (let p of this.post) {
      if (this.department == p.department) {
        if (personForm.value.designation == p.designation) {
          this.postselectedFinal.push(p);
        }
      }
    }
    let post: post = this.postselectedFinal.pop();
    this.eventFinal.post.level = post.level;
    console.log(this.eventFinal);
  }

  onDepartmentSubmit = (DepartmentForm: NgForm) => {
    this.postselected = [];
    for (let p of this.post) {
      if (DepartmentForm.value.department == p.department) {
        this.postselected.push(p);
      }
    }
    this.department = DepartmentForm.value.department
    //console.log(this.postselected);
  }

}
