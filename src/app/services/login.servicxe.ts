import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { employee } from '../model/db.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class login {

  private apiEndPoint = 'http://localhost:8080/login'
  //private url = this.apiEndPoint + '/movies';

  constructor(public http: HttpClient) {
  }

  // check login using post 
  public showLoginPage(resource: any): Observable<HttpResponse<employee>> {
    // Tried adding headers with no luck
    //   const headers = new Headers();
    //   headers.append('Access-Control-Allow-Headers', 'Content-Type');
    //   headers.append('Access-Control-Allow-Methods', 'GET');
    //   headers.append('Access-Control-Allow-Origin', '*');
    // post: existing login
    return this.http.post<employee>(this.apiEndPoint,
      // pass here 
      resource,
      { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // To make code loosely coupled
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //client error 
      errorMessage = 'Error ' + error.error.message;
    } else {
      //server error 
      errorMessage = `Error Code : ${error.status} \n Message :  ${error.message}`
    }
    return throwError(errorMessage)
  }

  employee: employee[] = [];

  add(employee: employee) {
    this.employee.push(employee);
  }

  give(): employee[] {
    return this.employee;
  }
}