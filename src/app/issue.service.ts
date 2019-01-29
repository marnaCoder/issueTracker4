import { Injectable } from '@angular/core';
import { Issue } from './issue-list/issue.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class IssueService {
  private issues: Issue[] = [];
   id = 0;
  private updatedIssues = new Subject<(Issue[])>();
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};

  constructor(private http: HttpClient, private router: Router) {}

  putIssue(description: string, status: string, serverity: string, createdDate: string, resolvedDate: string) {
    const issue: Issue = {
      id: null,
      description: description,
      status: status,
      serverity: serverity,
      createdDate: createdDate,
      resolvedDate: resolvedDate
    };
    console.log(issue);
     this.http.post<Issue>('http://localhost:3000/create', issue, this.httpOptions)
     .subscribe(data => {
          //  this.issues.push(issue);
          //   this.updatedIssues.next([...this.issues]);
          //   this.router.navigate(['/']);
          console.log(data);
          this.getIssue();
          this.router.navigate(['/']);
     });


  }
  getUpdatedIssue() {
    return this.updatedIssues.asObservable();
  }

  getIssue() {
    this.http.get<{message: string, issue: Issue[]}>('http://localhost:3000')
    .subscribe(issue => {
      // if (this.id === 0) {
      //   this.id = Math.max(...issue.issue.map( i => i.id));
      // }
      //  console.log(this.id);
      // this.issues = issues;
      // console.log(this.issues);
      // this.updatedIssues.next([...this.issues]);
      // console.log(issue);
      this.issues = issue.issue;
     // console.log(this.issues);
      this.updatedIssues.next([...this.issues]);
    });

  }
  deleteIssue(id: number) {

    return this.http.delete('http://localhost:3000/delete/' + id);
    // .subscribe(data => {
    //  // console.log(data);

    //   this.getIssue();
    //   this.router.navigate(['/']);

    // });
  }

  updatedIssue(issue: Issue) {
    this.http.put('http://localhost:3000/update/' + issue.id, issue, this.httpOptions)
    .subscribe( data => { console.log('issue Updated');
    this.getIssue();
    this.router.navigate(['/']);

  } );
  }
  getOneIssue(id: number) {
    const issue = this.issues.find(i => i.id === id);
    return issue;
  }
}
