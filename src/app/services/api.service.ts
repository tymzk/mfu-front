import {Injectable, EventEmitter} from "@angular/core";
import {WindowService} from "./window.service";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Subject, Person } from '../subjectlist/subject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  constructor (private http: Http) {}
  private apiUrl = 'http://localhost:3001/api';
  private adminUrl = `${this.apiUrl}/admins`;
  private adminIdsUrl = `${this.adminUrl}/ids`;
  private adminSubjectsUrl = `${this.adminUrl}/subjects`;
  private subjectsUrl = `${this.apiUrl}/subjects`;

  public getApi() : Observable<any> {
  return this.http.get(this.apiUrl)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw
      (error.json().error || 'Server error')
    );
  }

  public isAdministrator(email) {
    return
  }

  private headers = new Headers({'Content-Type': 'application/json'});

/*
  getSubjects(studentId: number): Promise<Subject[]> {
    const url = `${this.subjectsUrl}/${studentId}`;

    return this.http.get(this.subjectsUrl)
      .toPromise()
      .then(response => response.json().data as Subject[])
      .catch(this.handleError);
  }*/
  createSubject(subject: any): Promise<Subject> {
    return this.http
      .post(this.subjectsUrl, subject, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  /*
  getAdminMySubjects(id: String): void {
    const url = `${this.adminSubjectsUrl}/${id}`;
    console.log(url);
    this.http.get(url)
      .toPromise()
      .then(response => {
        console.log("test");
        console.log(response.json());
      })
      .catch(this.handleError);
  }
*/
  getAdminIds(): Promise<Person[]>{
    return this.http.get(this.adminIdsUrl)
      .toPromise()
      .then(response => response.json() as Person[])
      .catch(this.handleError);
  }
  getAdminMySubjects(id: String): Promise<Subject[]> {
    const url = `${this.adminSubjectsUrl}/${id}`;
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Subject[])
      .catch(this.handleError);
  }

  getMySubjects(id: String): Promise<Subject[]> {
    const url = `${this.subjectsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Subject[])
      .catch(this.handleError);
  }

  getSubjects(): Promise<Subject[]> {
    return this.http.get(this.subjectsUrl)
      .toPromise()
      .then(response => response.json().data as Subject[])
      .catch(this.handleError);
  }

/*
  delete(id: number): Promise<void> {
    const url = `${this.subjectsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.subjectsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.subjectsUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
*/
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

