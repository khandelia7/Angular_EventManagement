import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { employee, stat, event, post, message } from '../model/db.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class hod {

    constructor(public http: HttpClient) {
    }

    // get username details
    public showEmployeePage(username: String): Observable<HttpResponse<employee>> {
        return this.http.get<employee>('http://localhost:8080/login' + '/' + username,
            { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    // get events which hod has to registered this event
    public getHodEvent(username: String): Observable<HttpResponse<event[]>> {
        return this.http.get<event[]>('http://localhost:8080/dashboad3/stats' + '/' + username,
            { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }
    
    // get employee for drop down 
    public getEmployee(post: post, eventID: number): Observable<HttpResponse<employee[]>> {
        return this.http.post<employee[]>('http://localhost:8080/dashboad3/employee' + '/' + eventID,
            post,
            { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    // update HOD register / enrol employee 
    public updateStats(resource: any): Observable<HttpResponse<message[]>> {
        return this.http.post<message[]>('http://localhost:8080/dashboad3/stats',
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

}