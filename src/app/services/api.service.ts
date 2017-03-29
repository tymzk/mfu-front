import {Injectable, EventEmitter} from "@angular/core";
import { WindowService } from "./window.service";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Subject, Person, Assignment, AssignmentItem, SubmittedInfo } from '../models';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  constructor (private http: Http) {}
  private apiUrl = 'http://localhost:3001/api';
  private adminsUrl = `${this.apiUrl}/admins`;
  private usersUrl = `${this.apiUrl}/users`
  private subjectsUrl = `${this.apiUrl}/subjects`;

  public getApi() : Observable<any> {
  return this.http
    .get(this.apiUrl)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')
    );
  }

  public isAdministrator(email) {
    return
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  // GET /api/admins/ids
  getAdminIds(): Promise<Person[]>{
    const url = `${this.adminsUrl}/ids`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Person[])
      .catch(this.handleError);
  }

  addAdmin(userId: String) {
    const url = `${this.adminsUrl}/${userId}`;
    return this.http
      .post(url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  removeAdmin(userId: String) {
    const url = `${this.adminsUrl}/${userId}`;
    return this.http
      .delete(url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    var subjectList: Subject[];
    let body = res.json();
    subjectList = [];

    for(var i = 0; i < body.length; i++){
      console.log(body[i]);
      subjectList.push(new Subject().deserialize(body[i]));
    }

    console.log(JSON.stringify(subjectList));
    return subjectList;
  }

  // GET /api/admins/:id/subjects
  getAdminMySubjects(userId: string): Observable<Subject[]> {
    const url = `${this.adminsUrl}/${userId}/subjects/`;
    return this.http.get(url)
      .map(response => this.extractData(response) as Subject[])
      .catch(this.handleErrorObservable);
  }

  // POST /api/subjects
  createSubject(subject: Subject): Observable<any>  {
    const url = this.subjectsUrl;
    var body = JSON.stringify(subject);
    return this.http.post(url, body, this.options)
      .map(response => null)
      .catch(this.handleErrorObservable)
      .finally(()=>{
        console.log("created");
      });
  }

  updateSubject(subjectObjId: String, subject: Subject){
    const url = `${this.subjectsUrl}/${subjectObjId}`;
    var body = JSON.stringify(subject);
    return this.http.put(url, body, this.options)
      .map(response => null)
      .catch(this.handleErrorObservable)
      .finally(()=>{
        console.log("updated");
      });
  }

  // GET /api/subjects/subjectObjId/students
  getStudentsOfSubject(subjectObjId: String): Promise<Person[]>{
    const url = `${this.subjectsUrl}/${subjectObjId}/students`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Person[])
      .catch(this.handleError);
  }

  // PUT /api/subjects/:subjectObjId/students
  updateStudentsOfSubject(subjectObjId: String, students: String) {
    const url = `${this.subjectsUrl}/${subjectObjId}/students`;
    var body = students;
    return this.http.
      put(url, body ,this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // POST /api/subjects/:subjectObjId/teachers/:teacherId (no check)
  addTeacherOfSubject(subjectObjId: String, teacherId: String): Promise<void> {
    const url = `${this.subjectsUrl}/${subjectObjId}/teachers/${teacherId}`;
    return this.http
      .post(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  removeTeacherOfSubject(subjectObjId: String, teacherId: String): Promise<void> {
    const url = `${this.subjectsUrl}/${subjectObjId}/teachers/${teacherId}`;
    return this.http
      .delete(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  // PUT /api/subjects/:subjectObjId/assistants (no check)
  addAssistantOfSubject(subjectObjId: String, assistantId: String) {
    const url = `${this.subjectsUrl}/${subjectObjId}/assistants`;
    return this.http
      .post(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // POST /api/subjects/:subjectObjId/assignments
  createAssignment(subjectObjId: String, assignment: Assignment){
    const url = `${this.subjectsUrl}/${subjectObjId}/assignments`;
    var body = JSON.stringify(assignment);
//    var body = new Assignment().serialize(assignment);
    return this.http
      .post(url, body, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // PUT /api/subjects/:subjectObjId/assignments/:assignmentObjId
  updateAssignment(subjectObjId: string, assignment: Assignment): Observable<Assignment>{
    const url = `${this.subjectsUrl}/${subjectObjId}/assignments/${assignment._id}`;
    var body = JSON.stringify(assignment);
    return this.http.put(url, body, this.options)
      .map(response => response.json() as Assignment)
      .catch(this.handleErrorObservable)
      .finally(()=>{
        console.log("updated");
      });
  }

  // POST /api/subjects/:subjectObjId/assignments/:assignmentObjId/items
  createAssignmentItem(subjectObjId: String, assignmentObjId: String, assignmentItem: AssignmentItem){
    const url = `${this.subjectsUrl}/${subjectObjId}/assignments/${assignmentObjId}/items`;
    var body = JSON.stringify(assignmentItem);
    return this.http
      .post(url, body, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // PUT /api/subjects/:subjectObjId/assignments/:assignmentObjId/items/:assignmentItemObjId/
  updateAssignmentItem(subjectObjId: String, assignmentObjId: String, assignmentItem: AssignmentItem){
    const url = `${this.subjectsUrl}/${subjectObjId}/assignments/${assignmentObjId}/items/${assignmentItem._id}`;
    var body = JSON.stringify(assignmentItem);
    return this.http
      .put(url, body, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // GET /api/users/:userId/subjects
  userGetSubjects(id: String): Promise<Subject[]> {
    const url = `${this.usersUrl}/${id}/subjects`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Subject[])
      .catch(this.handleError);
  }

  // GET /api/users/:userId/subjects/:subjectObjId/assignments/:assignmentObjId
  userGetSubmittedInfo(userId: string, subjectObjId: string, assignmentObjId: string): Observable<SubmittedInfo[]> {
    const url = `${this.usersUrl}/${userId}/subjects/${subjectObjId}/assignments/${assignmentObjId}/files`;
    return this.http.get(url)
      .map(response => response.json() as SubmittedInfo[])
      .catch(this.handleErrorObservable)
      .finally(()=>{
        console.log("got");
      });
  }

  private handleErrorObservable (error: Response | any) {
    let errMsg: string;
    if(error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

