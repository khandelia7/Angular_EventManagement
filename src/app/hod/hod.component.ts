import { Component, OnInit } from '@angular/core';
import { employee, event, message, stat } from '../model/db.model';
import { Router, ActivatedRoute } from '@angular/router';
import { hod } from '../services/hod.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.css']
})
export class HodComponent implements OnInit {

  public id: string;
  employee1: employee;
  public errMessage: string;
  public hasError: boolean = false;
  event: event[] = [];
  isPass: Boolean = false;
  eventID: number = 0;
  eventEdit: event = null;
  count: number = 0;
  arrayCount: Array<number> = [];
  nrSelect = 47;
  employee: employee[] = [];
  employeeArrID: any[] = [];
  //role: any = [];
  message: message[] = [];


  // DROPDOWN BOX
  myForm: FormGroup;
  disabled = false;
  limitSelection = false;
  cities: Array<employee> = [];
  selectedItems: Array<employee> = [];
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'employeeID',
    textField: 'username'
  }

  constructor(public router: Router, private route: ActivatedRoute, public hod: hod, private fb: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('username');
    // get username details
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
    // get events which hod has to registered this event
    this.hod.getHodEvent(this.id)
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

    // DROPDOWN BOX 
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
  }

  // enroll button is click
  statusfunc(flag: Boolean, eventEdit: event) {
    this.selectedItems = [];
    this.isPass = flag;
    this.eventEdit = eventEdit;
    this.count = 0;
    this.arrayCount = [];
    this.count = (this.eventEdit.countOfPanel - this.eventEdit.entryCount);
    for (var i = 0; i < this.count; i++) {
      this.arrayCount.push(0);
    }
    console.log(eventEdit.post)

    // get employee for drop down 
    this.hod.getEmployee(eventEdit.post, eventEdit.eventID)
      .subscribe(
        data => {
          if (data.status == 200) {
            console.log("status is 200 ok");
            this.employee = data.body;
            //console.log(this.employee);
            this.cities = [];
            for (let e of this.employee) {
              //console.log(e); // 1, "string", false
              this.cities.push(e)
            }
            this.count = 0;
            this.count = (this.eventEdit.countOfPanel - this.eventEdit.entryCount);
            this.dropdownSettings = {
              singleSelection: false,
              idField: 'employeeID',
              textField: 'username',
              itemsShowLimit: this.count,
            };
            console.log(this.selectedItems);
          }
          this.hasError = false;
        },
        (error: string) => {
          this.hasError = true;
          this.errMessage = error;
        }
      )
  }

  // DROPDOWN BOX
  onItemSelect(item: any) {
    this.selectedItems.push(item);
    // console.log('onItemSelect', item);
  }

  // DROPDOWN BOX
  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  //button is click  when  hod assign employee 
  enroll(event: number, numbers: number) {
    // loop over values
    //this.employeeArrID = [];
    //var role: Array<String> = [];
    var role: string[];
    role = [];
    role.push(event.toString());
    role.push(numbers.toString());
    for (let value of Object.values(this.selectedItems)) {
      role.push(value.employeeID.toString());
    }
    console.log(role)
    let temp: number = role.length - 2;
    console.log(temp);
    console.log(numbers);
    if (temp == numbers) {
      // can proceed
      // pass this role JSON to API
      // update HOD register / enrol employee 
      this.hod.updateStats(role)
        .subscribe(
          data => { // good practise
            if (data.status == 200) {
              console.log("status is 200 ok");
              // can navigate or proceed
              this.message = data.body;
              //console.log(this.message);
              alert(this.message);
              this.onReset();
              this.router.navigate(['dashboad3/', this.id]);
            }
            this.hasError = false;
            this.onReset();
            this.router.navigate(['dashboad3/', this.id]);
          },
          (error: string) => {
            this.hasError = true;
            this.errMessage = error;
          }
        )
        this.onReset();
        this.router.navigate(['dashboad3/', this.id]);
    } else {
      this.router.navigate(['dashboad3/', this.id]);
      this.onReset();
      alert(numbers + " employee can only be enrolled.")
      this.router.navigate(['dashboad3/', this.id]);
    }
    this.selectedItems = [];
  }

  onReset() {
    this.myForm.reset();
    this.router.navigate(['dashboad3/', this.id]); //naviagte
  }
}