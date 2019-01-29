import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IssueComponent } from './issue/issue.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { FilterPipe } from './filter.pipe';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';


const routes: Routes = [
  {path: '', component: IssueListComponent},
  {path: 'add', component: IssueComponent},
  {path: 'edit/:id', component: IssueComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    IssueListComponent,
    FilterPipe,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
