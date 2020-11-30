import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { event, post } from '../model/db.model';
import { eventmanager } from '../services/eventmanager.service';

@Component({
  selector: 'app-filter-event',
  templateUrl: './filter-event.component.html',
  styleUrls: ['./filter-event.component.css']
})
export class FilterEventComponent implements OnInit {

  public errMessage: string;
  public hasError: boolean = false;
  isPass: Boolean = true;
  isPass1: Boolean = true;
  username: String = "";
  post: post[] = [];
  event: event[] = [];
  status: String = "publish";
  filterBy: String = "no Filter";
  filterOn: String = "no Value";

  constructor(public router: Router, private actRoute: ActivatedRoute, public eventmanager: eventmanager) {
    this.username = actRoute.snapshot.params.username;
  }

  ngOnInit(): void {
    // call all department api
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

    this.onFINAL();
  }

  // call this method when publish button is click
  OnPublish(publish: Boolean) {
    this.isPass = publish;
    this.status = "publish";
    this.onFINAL();
  }

  // call this method when draft button is click
  OnDraft(draft: Boolean) {
    this.isPass = draft;
    this.status = "draft";
    this.onFINAL();
  }

  // open date filter is click
  OnPublish1(publish: Boolean) {
    this.isPass1 = publish;
    this.filterBy = "eventDate"
    this.onFINAL();
  }

  // open department filter is click
  OnDraft1(draft: Boolean) {
    this.isPass1 = draft;
    this.filterBy = "department"
    this.onFINAL();
  }

  // on form submit of filter
  onFilterSubmit(filter: NgForm) {
    this.filterOn = filter.value.eventDate;
    this.onFINAL();
  }

  // REFRESH BUTTON
  onFINAL() {
    let url: String = "/" + this.status + "/" + this.username + "/" + this.filterBy + "/?filterOn=" + this.filterOn;
    console.log(url);
    this.eventmanager.getFilterEvent(url)
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

  // Delete API
  Delete(eventID: number) {
    //no subscribe as method delete is void
    this.eventmanager.deleteOneEvent(eventID).subscribe(
      resp => {
        if (resp.status == 200) {
          for (let i = 0; i < this.event.length; i++) {
            //iterate course
            let c = this.event[i];
            //give 1 course to c
            if (c.eventID == eventID) {
              //delete it
              this.event.splice(i, 1);
            }
          }
        }
      }
    );
    alert("This " + eventID + " Event Deleted");

  }
}
