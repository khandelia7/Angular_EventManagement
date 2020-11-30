import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { login } from './login.servicxe';
import { post, event } from '../model/db.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class eventmanager {

    constructor(public http: HttpClient) {
    }

    // get department details
    public showAllDepartment(): Observable<HttpResponse<post[]>> {
        return this.http.get<post[]>('http://localhost:8080/post/department',
            { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    // get all event by user-name authenticate, status = draft and filter
    public getFilterEvent(url: String): Observable<HttpResponse<event[]>> {
        return this.http.get<event[]>('http://localhost:8080/dashboad1/event' + url,
            { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    // delete event provided eventID
    deleteOneEvent(id: Number): Observable<HttpResponse<event>> {
        return this.http.delete<event>('http://localhost:8080/dashboad1/event/delete/' + id, 
            { observe: 'response' });
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
        return throwError(errorMessage);
    }
}