import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Issue } from '../issue-list/issue.model';
import {  ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  edit = false;
  id: number;
  @ViewChild('form') form: NgForm;
  constructor(public issueService: IssueService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.issueService.getIssue();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        const issue: Issue = this.issueService.getOneIssue(+paramMap.get('id'));
         this.form.value.description = issue.description;
        this.form.value.status = issue.status;
        this.form.value.serverity = issue.serverity;
        this.form.value.createdDate = issue.createdDate;
        this.form.value.resolvedDate = issue.resolvedDate;
        this.edit = true;
        this.id = issue.id;
      }
    });

  }
  onSubmit(form: NgForm) {
    if (this.edit) {
      const issue: Issue = {
        id: this.id,
        description: form.value.description,
        status: form.value.status,
        serverity: form.value.serverity,
        createdDate: form.value.createdDate,
        resolvedDate: form.value.resolvedDate,
      };
      this.issueService.updatedIssue(issue);
      this.edit = false;
    } else {
      this.issueService.putIssue(form.value.description, form.value.status,
        form.value.serverity , form.value.createdDate, form.value.resolvedDate);
        form.resetForm();
    }

  }

}
