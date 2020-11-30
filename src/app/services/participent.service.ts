import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { employee, stat, event } from '../model/db.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class participent {

    private apiEndPoint = 'http://localhost:8080/dashboad2'
    private url = this.apiEndPoint + '/events';

    constructor(public http: HttpClient) {
    }

    // get details of employee provide user-name
    public showEmployeePage(username: String): Observable<HttpResponse<employee>> {
        return this.http.get<employee>('http://localhost:8080/login' + '/' + username,
            { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    // show all event in which employee has enroll for event
    public postStats(username: String): Observable<HttpResponse<stat>> {
        return this.http.get<stat>(this.url + '/' + username,
            { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    // post all api where employee can enroll for selected events
    public postEvent(resource: any): Observable<HttpResponse<event[]>> {
        // Tried adding headers with no luck
        //   const headers = new Headers();
        //   headers.append('Access-Control-Allow-Headers', 'Content-Type');
        //   headers.append('Access-Control-Allow-Methods', 'GET');
        //   headers.append('Access-Control-Allow-Origin', '*');
        // post: existing login
        return this.http.post<event[]>(this.url,
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