import { Component, OnInit } from '@angular/core';
import { eventmanager } from '../services/eventmanager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { hod } from '../services/hod.service';
import { employee } from '../model/db.model';

@Component({
  selector: 'app-eventmanager',
  templateUrl: './eventmanager.component.html',
  styleUrls: ['./eventmanager.component.css']
})
export class EventmanagerComponent implements OnInit {

  isPass: Boolean = false;
  public id: string;
  employee1: employee;

  constructor(public eventmanagerService: eventmanager, public router: Router, private route: ActivatedRoute, public hod: hod) {
    this.id = this.route.snapshot.paramMap.get('username');
    this.hod.showEmployeePage(this.id)
      .subscribe(resp => {
        console.log(resp);
        console.log(resp.status);
        console.log(resp.statusText);
        console.log(resp.url);
        this.employee1 = resp.body;
      });

  }

  ngOnInit(): void {
  }

  Page(flag: Boolean) {
    this.isPass = flag;
  }

}
